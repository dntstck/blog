---
title: "riscv-cluster-deepdive"
date: 2026-08-12T23:07:50
publishDate: 2026-08-12T23:45:00
featured: true
devlog: false
tags: [riscv, risc, cluster, rv2, homelab, networking, linux]
---

# risc‑v microrack supercomputer; rv2 cluster architecture deep-dive

in 2025 i put together a fully‑functional risc‑v microrack supercomputer built from three orange pi rv2 boards, a 5‑port tp‑link poe switch, and a heavily‑modified phanteks hdd caddy.
 despite the small footprint, this cluster is anything but a toy; it runs kubernetes, slurm, pmix, openmpi, a private docker registry, grafana, prometheus, loki, and multiple web portals;
 all on native risc‑v silicon. the result is a compact but serious hpc system capable of driving multiple buildfarms, modern development environments, and ai workloads.
with its local registry for risc‑v containers, on‑device metrics collection, native grafana stack, dual‑network backplane, and pure nvme storage, the setup delivers real performance.
 24gb of combined ram and over 400gb of nvme give this machine more punch than its size suggests.

![rv2 cluster](assets/img/rv2-cluster.png)

## physical architecture

### hardware 
- 3× orange pi rv2 (8gb ram)
- dual nvme slots
- dual gbe nics
- risc‑v cpu (xuantie c910)
- nvme layout
- rv2‑1 (riscv-core): 2× 128gb nvme
- rv2‑2 (riscv-node-1): 1× 128gb nvme
- rv2‑3 (riscv-node-2): 1× 128gb nvme
- networking
- tp‑link 5‑port poe switch
- chassis
- modified phanteks 3‑bay hdd caddy
- each rv2 mounted on its own tray
- nvme drives mounted directly under each board
- cabling routed through the rear channel for airflow

![rv2 trays](assets/img/rv2-trays.png)

## network

### ip layout

cluster ips:

- riscv-core: 192.168.10.64
- riscv-node-1: 192.168.10.65
- riscv-node-2: 192.168.10.66

these ips are static and defined in `/etc/hosts` across all nodes.
each rv2 has dual gbe:
- nic0: cluster‑internal traffic
- nic1: external services, registry, grafana, ingress

separation keeps hpc traffic isolated from web/ui traffic.

### private registry

for this cluster, i have utilized a private registry for docker images, containers.. etc
maintaining your own registry with riscv is important as upstream support is flaky at best.
the private registry lives at:

```
/srv/nvme/registry
```

bound to:

```
registry:5000
```

this registry is used for:
- risc‑v container builds
- cluster‑wide deployments
- artifact‑clean reproducible workflows
- local ci for rust, c, and microservices

## operating system 

### ubuntu server

all nodes run a minimal ubuntu server distribution tuned for:
- low‑latency networking
- fast nvme i/o
- clean systemd service orchestration
- predictable boot behavior

## git repo as a service

i designed the cluster to use a git repo as a "reference" operating system;
 any manifests, filesystems for containers, binaries, anything and everything regarding this cluster,
 how it is configured or what binaries it runs, all lives in the `riscv-core` repo.
this ensures that the entire rv2 cluster can be rebuilt from this repository.

the repo structure is fairly self explanatory, but;

- binaries → `bin/`
- containers → `docker/`
- manifests → `k8s/`
- hpc stack → `slurm/` + `mpi/`
- system roots → `sys/`
- automation → `scripts/`
- documentation → `docs/`

```bash
riscv-core/
├── bin
├── docker
├── docs
├── k8s
├── lxd
├── mpi
├── scripts
├── slurm
└── sys
```

each directory represents a subsystem of the cluster & can be rebuilt from this repository.

## /bin

![rv2 /bin](assets/img/rv2-bin.png)

this directory contains all risc‑v elf binaries required by the cluster:

- custom‑compiled k3s
- kubelet, kubectl
- containerd, runc
- prometheus node exporter
- slurm daemons
- pmix, openmpi
- supporting tools for cluster bring‑up

these binaries are built from source using the toolchains in `docker/machines/`.
they are copied to each rv2 node during deployment, ensuring deterministic behavior across the cluster.

## /docker 

![rv2 /docker](assets/img/rv2-docker.png)

this directory contains all docker‑related components:

### docker/machines/
reproducible build environments for:

- c
- rust
- go
- python
- minimal vim dev shells

these machines allow native risc‑v builds inside containers, backed by the private registry.

the private registry itself runs on `riscv-core` and stores images on nvme:

```
/srv/nvme/registry
```

it is used for:

- risc‑v container builds
- kubernetes deployments
- slurm/mpi job containers
- ci pipelines
- reproducible builds

certificates are generated via scripts in `scripts/`, and the registry is deployed via manifests in `k8s/registry/`.

### docker/observability/
full grafana + prometheus + loki stack:

- provisioning
- dashboards
- datasources
- plugins
- exporters
- blackbox probes
- ui bundles

everything is pre‑provisioned so grafana boots fully configured.

### docker/services/
internal cluster services packaged as containers.

## /docs

![rv2 /docs](assets/img/rv2-docs.png)

documentation describing:

- cluster architecture
- reproducible build workflows
- slurm/mpi integration
- kubernetes deployment
- registry usage
- system miniroots
- hardware layout

this directory is the knowledge base for the cluster.

## /k8s 

![rv2 cluster](assets/img/rv2-k8s.png)

kubernetes deployment layer, all kubernetes manifests live here:

- ci runners
- registry
- ingress
- observability
- vault
- dev pods
- storage provisioners
- namespaces
- smoke tests

this directory is the declarative layer for the entire k3s cluster.

take heed that running kubernetes on risc‑v is not a turnkey operation.
 the rv2 cluster uses a **custom‑compiled k3s build**,
built from source with risc‑v patches applied to the kubelet, containerd, and cni plugins.

the build process produces:

- `k3s` (risc‑v elf)
- `kubelet`
- `kubectl`
- `containerd`
- `runc`
- `flannel` or `calico` cni plugins
- supporting binaries for cluster networking

all binaries are stored under `bin/` for reproducible deployment.

the control plane runs on **riscv-core**, while worker nodes (`riscv-node-1`, `riscv-node-2`) join via kubeadm‑style bootstrap scripts.
the cluster runs full workloads: dev pods, ci runners, observability stack, registry, ingress, and internal services.

this is a **native risc‑v kubernetes cluster**, not emulated, not cross‑arch.

### dev pods for risc‑v development

the `k8s/` directory includes dev pods for:

- c
- rust
- go
- python
- vim
- generic risc‑v shells

each pod mounts a persistent volume:

```
dev-src-pv.yaml
dev-src-pvc.yaml
```

this allows:

- editing code inside the cluster
- building containers inside the cluster
- running tests inside the cluster
- pushing images directly to the registry
- running workloads immediately

the dev pods turn the rv2 cluster into a full risc‑v development environment.

## /k8s examples

### deploying a risc‑v rust service

```
apiVersion: apps/v1
kind: Deployment
metadata:
name: rust-riscv-service
spec:
replicas: 2
selector:
matchLabels:
app: rust-riscv-service
template:
metadata:
labels:
app: rust-riscv-service
spec:
containers:
- name: rust-riscv-service
image: registry:5000/rust-riscv-service:latest
```

### ingress example

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
name: riscv-service-ingress
spec:
rules:
- host: riscv.local
http:
paths:
- path: /
pathType: Prefix
backend:
service:
name: rust-riscv-service
port:
number: 8080
```

## /lxd

![rv2 /lxd](assets/img/rv2-lxd.png)

lxd profiles and container definitions used for:

- isolated toolchain builds
- testing risc‑v binaries
- validating slurm/mpi builds
- running minimal environments

lxd provides vm‑style isolation without virtualization overhead.

## /mpi

![rv2 /mpi](assets/img/rv2-mpi.png)

pmix/openmpi build layer, contains:

- pmix builds
- openmpi builds
- risc‑v patches
- integration scripts
- example mpi workloads

this directory is the hpc communication layer.

## /scripts

![rv2 /scripts](assets/img/rv2-scripts.png)

automation & cluster scripts for:

- cert generation
- registry maintenance
- node setup
- slurm configuration
- kubernetes deployment
- reproducible builds
- system miniroot installation

scripts allow the entire cluster to be rebuilt cleanly.

## /slurm

![rv2 /slurm](assets/img/rv2-slurm.png)

hpc scheduler configuration, contains:

- slurm.conf
- node definitions
- controller configuration
- pmix/openmpi integration
- example job scripts
- accounting/logging configuration

this directory is the hpc scheduling layer.

## /sys

![rv2 /sys](assets/img/rv2-sys.png)

minimal system roots used by:

- build machines
- dev pods
- slurm nodes
- kubernetes workloads

these miniroots ensure consistent base systems across all nodes.

# software & hardware in unison

the rv2 microrack is the hardware.
the `riscv-core` repo is the software distribution.

together they form a complete, symbiotic machine:

hardware:
- 3× orange pi rv2
- nvme storage
- dual gbe
- poe power
- static ips
- microrack chassis

software (from this repo):
- custom k3s/k8s
- custom slurm
- custom pmix/openmpi
- custom node exporter
- private registry
- observability stack
- dev pods
- ci runners
- system miniroots
- reproducible build machines

the repo is designed so the entire cluster can be rebuilt from scratch using only:

- the binaries in `bin/`
- the containers in `docker/`
- the manifests in `k8s/`
- the hpc stack in `slurm/` + `mpi/`
- the system roots in `sys/`
- the automation in `scripts/`

it is a **cluster distribution**, not a config dump.

# **future expansion**

the architecture supports:

- adding more rv2 nodes
- expanding nvme storage
- adding gpu accelerators (future risc‑v boards)
- integrating ceph or longhorn
- expanding slurm partitions
- adding more ci runners
- adding more dev pods
- adding more observability exporters

the repo already contains the modular structure needed for expansion.

# 10. why this cluster matters

this microrack is not just a hobby project.
it represents a shift toward:

- risc‑v as a first‑class compute architecture
- hpc as a long‑term professional identity
- systems engineering with cutting edge architectures
- reproducible infrastructure
- low‑power supercomputing

the rv2 cluster is a miniature datacenter built from scratch, running a full hpc stack on open silicon.

essentially a supercomputer in a shoebox.

