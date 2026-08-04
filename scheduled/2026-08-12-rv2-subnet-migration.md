---
title: "rv2-subnet-migration"
date: 2026-08-12T20:41:31
publishDate: 2026-08-13T00:00:00
featured: false
devlog: false
tags: [rv2, riscv, cluster, networking, linux, homelab]
---


# rv2 cluster migrating from 192.168.0.x → 192.168.10.x

the rv2 microrack originally ran on the **192.168.0.64–66** subnet.
after restructuring the network layout, the cluster was migrated to **192.168.10.64–66**.

this required updating:

- **k3s server + agent configs**
- **kubernetes manifests**
- **slurm node definitions**
- **mpi hostfiles**
- **registry ip + tls san**
- **containerd trust stores**
- **local risc‑v container images**
- **dev pods + ci runners**
- **observability stack endpoints**

---

## 1. updating node ips

### old ips

```text
192.168.0.64# riscv-core
192.168.0.65# riscv-node-1
192.168.0.66# riscv-node-2
```

### new ips

```text
192.168.10.64# riscv-core
192.168.10.65# riscv-node-1
192.168.10.66# riscv-node-2
```

###  static config (example)

on each node:

```bash
sudo nano /etc/network/interfaces
```

example for `riscv-core`:

```text
auto eth0
iface eth0 inet static
address 192.168.10.64
netmask 255.255.255.0
gateway 192.168.10.1
```

then:

```bash
sudo systemctl restart networking
# or just reboot
sudo reboot
```

after reboot, verify:

```bash
ip addr show eth0
ping -c 3 192.168.10.1
```

---

## 2. fixing k3s server + agent configuration

k3s stores node ips in:

- `/etc/systemd/system/k3s.service`
- `/etc/systemd/system/k3s-agent.service`
- `/etc/rancher/k3s/config.yaml` (if used)

### 2.1 use systemd overrides (recommended)

instead of editing the main unit files, use overrides:

```bash
sudo systemctl edit k3s
```

override example for server (`riscv-core`):

```text
[service]
environment="k3s_node_ip=192.168.10.64"
environment="k3s_advertise_address=192.168.10.64"
environment="k3s_tls_san=192.168.10.64"
execstart=
execstart=/usr/local/bin/k3s server \
--node-ip=${k3s_node_ip} \
--advertise-address=${k3s_advertise_address} \
--tls-san=${k3s_tls_san}
```

for agents (`riscv-node-1`, `riscv-node-2`):

```bash
sudo systemctl edit k3s-agent
```

example override on `riscv-node-1`:

```text
[service]
environment="k3s_node_ip=192.168.10.65"
environment="k3s_server_url=https://192.168.10.64:6443"
execstart=
execstart=/usr/local/bin/k3s agent \
--node-ip=${k3s_node_ip} \
--server=${k3s_server_url}
```

example override on `riscv-node-2`:

```text
[service]
environment="k3s_node_ip=192.168.10.66"
environment="k3s_server_url=https://192.168.10.64:6443"
execstart=
execstart=/usr/local/bin/k3s agent \
--node-ip=${k3s_node_ip} \
--server=${k3s_server_url}
```

### 2.2 optional: k3s config.yaml

if you use `/etc/rancher/k3s/config.yaml`:

```bash
sudo nano /etc/rancher/k3s/config.yaml
```

example:

```yaml
node-ip: 192.168.10.64
advertise-address: 192.168.10.64
tls-san:
- 192.168.10.64
```

### 2.3 reload + restart

```bash
sudo systemctl daemon-reload
sudo systemctl restart k3s
sudo systemctl restart k3s-agent
```

verify:

```bash
kubectl get nodes -o wide
```

---

## 3. fixing slurm node definitions

slurm uses static ips in `slurm.conf`.

```bash
sudo nano /etc/slurm/slurm.conf
```

### old

```text
nodename=riscv-core nodeaddr=192.168.0.64
nodename=riscv-node-1 nodeaddr=192.168.0.65
nodename=riscv-node-2 nodeaddr=192.168.0.66
```

### new

```text
nodename=riscv-core nodeaddr=192.168.10.64
nodename=riscv-node-1 nodeaddr=192.168.10.65
nodename=riscv-node-2 nodeaddr=192.168.10.66
```

restart slurm:

```bash
sudo systemctl restart slurmctld
sudo systemctl restart slurmd
```

validate:

```bash
sinfo
squeue
```

---

## 4. fixing mpi hostfiles

update mpi hostfile (e.g. `hosts-rv2`):

```bash
nano ~/mpi/hosts-rv2
```

```text
192.168.10.65 slots=2
192.168.10.66 slots=2
```

test:

```bash
mpirun -np 4 --hostfile ~/mpi/hosts-rv2 ./mpi-test
```

---

## 5. rebuilding the private registry for the new ip

old registry:

```text
https://192.168.0.64:5000
```

new registry:

```text
https://192.168.10.64:5000
```

regenerate tls certs with the new san and update the registry container.

---

## 6. regenerating tls certificates (new san)

### 6.1 openssl config

```bash
sudo mkdir -p /etc/registry
sudo nano /etc/registry/openssl-san.cnf
```

```text
[ req ]
default_bits = 4096
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[ req_distinguished_name ]
cn = 192.168.10.64

[ v3_req ]
subjectaltname = @alt_names

[ alt_names ]
ip.1 = 192.168.10.64
```

### 6.2 generate cert + key

```bash
sudo openssl req -new -x509 -sha256 -days 365 \
-nodes \
-out /etc/registry/domain.crt \
-keyout /etc/registry/domain.key \
-config /etc/registry/openssl-san.cnf \
-extensions v3_req
```

### 6.3 verify san

```bash
openssl x509 -in /etc/registry/domain.crt -text -noout | grep -a1 "subject alternative name"
```

expected:

```text
ip address:192.168.10.64
```

---

## 7. updating registry configuration

if you run registry via docker:

```bash
sudo mkdir -p /etc/registry
sudo nano /etc/registry/config.yml
```

```yaml
version: 0.1
log:
level: info
http:
addr: :5000
tls:
certificate: /etc/registry/domain.crt
key: /etc/registry/domain.key
```

restart registry container (example):

```bash
docker stop registry || true
docker rm registry || true

docker run -d \
--name registry \
-p 5000:5000 \
-v /etc/registry/config.yml:/etc/docker/registry/config.yml:ro \
-v /etc/registry/domain.crt:/etc/registry/domain.crt:ro \
-v /etc/registry/domain.key:/etc/registry/domain.key:ro \
registry:2
```

verify:

```bash
curl -k https://192.168.10.64:5000/v2/
```

---

## 8. updating trust stores on all nodes

containerd / docker need to trust the registry cert.

on **every node**:

```bash
sudo mkdir -p /etc/docker/certs.d/192.168.10.64:5000
sudo cp /etc/registry/domain.crt /etc/docker/certs.d/192.168.10.64:5000/ca.crt
```

if k3s uses containerd’s registry config, also:

```bash
sudo mkdir -p /etc/rancher/k3s
sudo nano /etc/rancher/k3s/registries.yaml
```

```yaml
mirrors:
192.168.10.64:5000:
endpoint:
- "https://192.168.10.64:5000"

configs:
192.168.10.64:5000:
tls:
ca_file: /etc/docker/certs.d/192.168.10.64:5000/ca.crt
insecure_skip_verify: false
```

restart runtimes:

```bash
sudo systemctl restart containerd
sudo systemctl restart k3s
sudo systemctl restart k3s-agent
```

---

## 9. rebuilding local risc‑v images for the new registry

### 9.1 build image locally

```bash
docker build -t node-exporter:1.8.0-riscv64 .
```

### 9.2 tag for new registry

```bash
docker tag node-exporter:1.8.0-riscv64 \
192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

### 9.3 push

```bash
docker push 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

### 9.4 verify catalog

```bash
curl -k https://192.168.10.64:5000/v2/_catalog
curl -k https://192.168.10.64:5000/v2/node-exporter/tags/list
```

### 9.5 pull from any node (containerd)

```bash
sudo ctr images pull 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

---

## 10. updating kubernetes manifests

any manifest referencing the old registry ip must be updated.

### old

```yaml
image: 192.168.0.64:5000/node-exporter:1.8.0-riscv64
```

### new

```yaml
image: 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

apply:

```bash
kubectl apply -f k8s/observability/node-exporter.yaml
```

verify:

```bash
kubectl get pods -n observability -o wide
kubectl describe pod -n observability <pod-name>
```

---

## 11. updating observability stack

### 11.1 prometheus scrape configs

update `prometheus.yml` or your k8s configmap:

```yaml
scrape_configs:
- job_name: 'rv2-nodes'
static_configs:
- targets: ["192.168.10.65:9100", "192.168.10.66:9100"]
```

if running in k8s:

```bash
kubectl apply -f k8s/observability/prometheus-configmap.yaml
kubectl rollout restart deployment prometheus -n observability
```

### 11.2 grafana

grafana dashboards usually pick up new targets automatically via prometheus.
just confirm panels:

```text
node exporter panels show data from 192.168.10.65 / 192.168.10.66
```

---

## 12. final validation

### 12.1 kubernetes

```bash
kubectl get nodes -o wide
kubectl get pods -A
```

expect:

- all nodes `ready`
- pods `running`

### 12.2 slurm

```bash
sinfo
squeue
```

expect:

- nodes `idle` or `alloc`
- jobs run cleanly

### 12.3 mpi

```bash
mpirun -np 4 --host 192.168.10.65,192.168.10.66 ./mpi-test
```

expect:

- distributed jobs succeed
- no ssh / host resolution errors

### 12.4 registry

```bash
ctr images pull 192.168.10.64:5000/node-exporter:1.8.0-riscv64
docker pull 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

expect:

- pull succeeds
- no tls / san errors

---

## ✔ migration complete

rv2 cluster is now fully operational on the **192.168.10.x** subnet:

- **k3s / kubernetes fixed**
- **slurm fixed**
- **mpi fixed**
- **registry rebuilt**
- **tls san regenerated**
- **trust stores updated**
- **risc‑v images rebuilt + pushed**
- **observability stack updated**

done