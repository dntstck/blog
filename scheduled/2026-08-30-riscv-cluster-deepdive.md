---
title: "riscv-cluster-deepdive"
date: 2026-08-30T23:07:50
publishDate: 2026-09-31T23:00:00
featured: true
devlog: false
tags: [riscv, risc, cluster, rv2, homelab, networking, linux]
---

# risc‑v microrack supercomputer; rv2 cluster architecture deep-dive

in 2025 i put together a fully‑functional risc‑v microrack supercomputer built from three orange pi rv2 boards, a 5‑port tp‑link poe switch, and a heavily‑modified phanteks hdd caddy.
 despite the small footprint, this cluster is anything but a toy; it runs kubernetes, slurm, pmix, openmpi, a private docker registry, grafana, prometheus, loki, and multiple web portals;
 all on native risc‑v silicon. the result is a compact but serious hpc system capable of driving multiple buildfarms, modern development environments, and ai workloads.
with its local registry for risc‑v containers, on‑device metrics collection, native grafana stack, dual‑network backplane, and pure nvme storage, the setup delivers real performance.
 24gb of combined ram and over 400gb of nvme give this machine far more punch than its small size suggests.

![rv2 cluster](assets/img/rv2-cluster.png)

## physical architecture

### hardware 
- 3× orange pi rv2 (8gb ram)
- dual nvme slots
- dual gbe nics
- risc‑v cpu (xuantie c910)
- nvme:
-rv2‑1 (riscv-core): 2× 128gb nvme
-rv2‑2 (riscv-node-1): 1× 128gb nvme
-rv2‑3 (riscv-node-2): 1× 128gb nvme
- networking
-tp‑link 5‑port poe switch
- chassis
- modified phanteks 3‑bay hdd caddy
- each rv2 mounted on its own tray
- nvme drives mounted directly under each board

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
- clean reproducible workflows
- local ci for rust, c & microservices

## operating system 

### ubuntu server

all nodes run a minimal ubuntu server distribution tuned for:
- risc-v, few stable linux builds exist for risc-v; but ubuntu is one of them.
- networking, ubuntu server is a powerful distro for networking, server applications & more
- stability, a reliable choice; the only stable operating system currently available for this hardware.
- user experience, nearly every dev has used some variant of ubuntu. 

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

### /k8s examples;

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

## software & hardware in unison

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

software:
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

# deployment

## building containers (native risc‑v)

containers are built directly on `riscv-core` using the toolchains in `docker/machines/`.
a typical build cycle looks like:

```bash
docker build -t rust-alpine-env:latest .
docker tag rust-alpine-env:latest registry:5000/rust-alpine-env:latest
docker push registry:5000/rust-alpine-env:latest
```

the registry is always local:

```
registry:5000
```

backed by:

```
/srv/nvme/registry
```

## verifying registry state

```bash
curl -s https://registry:5000/v2/ --cacert /etc/registry/ca.crt
```

this confirms that the pushed image is available for k3s.

## containerd cache control

k3s uses containerd internally, so stale layers must be removed before redeploying:

```bash
sudo ctr -n k8s.io images rm registry:5000/rust-alpine-env:latest
```

this forces a clean pull from the registry on the next deployment.


# kubernetes deployment workflows

dev pods are rebuilt constantly during development.
the workflow is intentionally simple:

```bash
kubectl delete pod rust-dev -n dev
kubectl apply -f rust-dev.yaml
kubectl describe pod rust-dev -n dev
kubectl exec -it rust-dev -n dev -- bash
```

deleting the pod ensures that k3s pulls the latest image from the registry.

## iterating manifests

```bash
vim rust-dev.yaml
kubectl apply -f rust-dev.yaml
kubectl describe pod rust-dev -n dev
```

this loop is used for:

- rust dev pods
- c dev pods
- go dev pods
- python dev pods
- vim environments
- sqlite/postgres test pods

each environment is defined in `k8s/systems/`.

## multi‑pod deployment

```bash
kubectl apply -f dev-riscv64-c.yaml \
-f dev-riscv64-go.yaml \
-f dev-riscv64-py.yaml \
-f dev-riscv64-rust.yaml \
-f dev-riscv64-vim.yaml
```

these manifests provide isolated, reproducible risc‑v development shells.

## service deployment

```bash
kubectl apply -f postgres.yaml
kubectl apply -f sqlite.yaml
kubectl apply -f nginx-ingress.yaml
kubectl apply -f grafana.yaml
```

the cluster uses:

- local ingress
- local observability stack
- local databases
- local dev pods
- local registry

everything runs inside the cluster

## debugging workloads

```bash
kubectl get pods --all-namespaces
kubectl describe pod nginx-ingress
kubectl describe pod rust-dev -n dev
kubectl get pv,pvc -n dev
```

# hpc workflows

the rv2 microrack runs mpi workloads across nodes using pmix/openmpi built from source.

## running mpi workloads directly

```bash
mpirun -np 4 --host riscv-node-1,riscv-node-2 ./mpi/tests/riscv-vectorbench
```

# metrics

this microcluster benefits from the beauty of grafana, compiling all scraped data from
 prometheus & node_exporter into a visually aesthetic format.

i split the dashboards in two, keeping one for general metrics and another purely for kubernetes metrics.

![rv2 grafana, general dashboard](assets/img/devlog-v7-grafana.png)

and the kubernetes dashboard:

![rv2 grafana, kubernetes dashboard](assets/img/devlog-v7-grafana-k3s.png)

# future expansion

the architecture supports:

- adding more rv2 nodes
- expanding nvme storage
- adding gpu accelerators (future risc‑v boards)
- integrating ceph or longhorn
- expanding slurm partitions
- adding more ci runners
- adding more dev pods
- adding more observability exporters

# why this cluster matters

this microrack is not just a hobby project, or a "bunch of sbcs" connected together with kubernetes slapped on top. it is proof of what can be achieved 
wtihout limit, without criticism & without judgement, but with curiosity, knowledge and discovery. a true "supercomputer"; completely on risc-v, running 
slurm, openmpi, pmix and kubernetes... a miniature datacenter built from scratch, running a cutting edge architecture & full hpc stack on open silicon.

essentially a supercomputer in a shoebox.

