---
title: "rv2-subnet-migration"
date: 2026-08-05T18:41:31
publishDate: 2026-08-05T20:00:00
featured: false
devlog: false
tags: [rv2, riscv, cluster, networking, linux, homelab]
---

# rv2 microcluster
## subnet migration; from 192.168.0.x → 192.168.10.x

the rv2 risc-v microcluster originally ran on the **192.168.0.64–66** subnet.
due to restructuring my network layout, installing new switches & router,
the cluster needed to be migrated to **192.168.10.64–66**.

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



## 1. updating node ips

luckily, i have already migrated the cluster over network-level wise, they can be accessed or configured on their new ip addresses,
however the local docker registry, kubernetes, slurm, etc was still running on the old subnet.


### old ips

```text
192.168.0.64	# riscv-core
192.168.0.65	# riscv-node-1
192.168.0.66	# riscv-node-2
```

### new ips

```text
192.168.10.64	# riscv-core
192.168.10.65	# riscv-node-1
192.168.10.66	# riscv-node-2
```

## 2. rebuild registry certs for new subnet

on riscv-core, create:
```bash
sudo vim /etc/registry/ca.cnf
```

ca.cnf:

```
[ req ]
default_bits       = 4096
prompt             = no
distinguished_name = dn
x509_extensions    = v3_ca

[ dn ]
CN = registry-ca

[ v3_ca ]
basicConstraints = critical, CA:true
keyUsage = critical, keyCertSign, cRLSign
```

### **2.1 san config**

on `riscv-core`:

```bash
sudo mkdir -p /etc/registry
sudo vim /etc/registry/openssl-san.cnf
```

contents:

```text
[ req ]
default_bits       = 4096
distinguished_name = req_distinguished_name
req_extensions     = v3_req
prompt             = no

[ req_distinguished_name ]
cn = registry

[ v3_req ]
subjectaltname = @alt_names

[ alt_names ]
dns.1 = registry
ip.1  = 192.168.10.64
```

![openssl san config](assets/img/devlog-v7-openssl-san.png)


### **2.2 ca + leaf cert**

```bash
sudo openssl req -x509 -new -nodes -days 3650 \
  -newkey rsa:4096 \
  -keyout /etc/registry/ca.key \
  -out /etc/registry/ca.crt \
  -config /etc/registry/ca.cnf
```

![leaf creation](assets/img/devlog-v7-gen-key.png)

```bash
sudo openssl req -new -nodes -newkey rsa:4096 \
  -keyout /etc/registry/domain.key \
  -out /etc/registry/domain.csr \
  -config /etc/registry/openssl-san.cnf
```

![config](assets/img/devlog-v7-gen-key2.png)

```bash
sudo openssl x509 -req \
  -in /etc/registry/domain.csr \
  -CA /etc/registry/ca.crt \
  -CAkey /etc/registry/ca.key \
  -CAcreateserial \
  -out /etc/registry/domain.crt \
  -days 365 \
  -extensions v3_req \
  -extfile /etc/registry/openssl-san.cnf
```

![generating openssl san](assets/img/devlog-v7-gen-san.png)

### verify

run this:
```bash
openssl x509 -in /etc/registry/domain.crt -text -noout | grep -A2 "X509v3 Basic Constraints"
openssl x509 -in /etc/registry/domain.crt -text -noout | grep -A2 "Subject Alternative Name"
```

output should verify the certificates are now tied to the new subnet.

## 3. install trust on all nodes

### **3.1 core node**

```bash
sudo cp /etc/registry/ca.crt /usr/local/share/ca-certificates/registry-ca.crt
sudo update-ca-certificates
```

![updated certs](assets/img/devlog-v7-update-certs.png)

### **3.2 worker nodes**

from `riscv-core`:

```bash
sudo scp /etc/registry/ca.crt sysadmin@192.168.10.65:~/
sudo scp /etc/registry/ca.crt sysadmin@192.168.10.66:~/
```

on each worker:

```bash
sudo cp ~/ca.crt /usr/local/share/ca-certificates/registry-ca.crt
sudo update-ca-certificates
```

### **3.3 docker / containerd registry trust**

on each node:

```bash
sudo mkdir -p /etc/docker/certs.d/192.168.10.64:5000
sudo cp /etc/registry/ca.crt /etc/docker/certs.d/192.168.10.64:5000/ca.crt
```

restart containerd...

```bash
sudo systemctl restart containerd
```

### 4. restart registry with new certs

using registry config (e.g. `/srv/registry/config.yaml`):

![registry config.yaml](assets/img/devlog-v7-reg-config.png)

restart registry:
```bash
sudo docker stop registry || true
sudo docker rm registry || true

sudo docker run -d -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /srv/registry/config.yaml:/etc/docker/registry/config.yml \
  -v /etc/registry:/etc/registry \
  -v /srv/registry/data:/var/lib/registry \
  ghcr.io/distribution/distribution:latest \
  serve /etc/docker/registry/config.yml
```

test:

```bash
curl -s http://registry:5000/v2/_catalog
```

container test:

```bash
sudo ctr images pull 192.168.10.64:5000/rust-alpine-env:latest
```

## building local risc‑v images for the new registry
now the local registry is running on the new subnet, images can be built and pushed to the registry;
 as an example here is `node_exporter`:

### build image locally

```bash
docker build -t node-exporter:1.8.0-riscv64 .
```

### tag for new registry

```bash
docker tag node-exporter:1.8.0-riscv64 \
192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

### push

```bash
docker push 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

### verify catalog

```bash
curl -k https://192.168.10.64:5000/v2/_catalog
curl -k https://192.168.10.64:5000/v2/node-exporter/tags/list
```

### pull from any node (containerd)

```bash
sudo ctr images pull 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

phew, thats done! all up and running, this means the private registry is now fully accesible from the main node, as well as node-1 and node2.
it is also perfectly accessible on my local network, which may prove useful in the future.

now; retagging the images

## 5. retag + push images to new endpoint

old tags: `192.168.0.64:5000/...`
new tags: `192.168.10.64:5000/...`

example:

```bash
docker tag rust-alpine-env:latest 192.168.10.64:5000/rust-alpine-env:latest
docker push 192.168.10.64:5000/rust-alpine-env:latest

curl -k https://192.168.10.64:5000/v2/rust-alpine-env/tags/list --cacert /etc/registry/domain.crt
sudo ctr images pull 192.168.10.64:5000/rust-alpine-env:latest
```

## 6. kubernetes

local registry is up and running on the new subnet, i need to tweak kubernetes to also run from the same subnet.
originally i installed the server and corresponding nodes were installed via script, i need to create custom config files in order
to point the k3s server and nodes to the new subnet and future proof kubernetes for scalability.

```bash
sudo mkdir -p /etc/rancher/k3s
sudo vim /etc/rancher/k3s/config.yaml
```

`config.yaml`:

```yaml
node-ip: 192.168.10.64
advertise-address: 192.168.10.64
tls-san:
  - 192.168.10.64
  - riscv-core
```

![kubernetes config yaml](assets/img/devlog-v7-k3s-config.png)

### 6.1 reload k3s server:

```bash
sudo systemctl daemon-reload
sudo systemctl restart k3s
```


### 6.2 on the agents

`riscv-node-1`:

```bash
sudo mkdir -p /etc/rancher/k3s
sudo vim /etc/rancher/k3s/config.yaml

```

config.yaml:

```text
server: "https://192.168.10.64:6443"
token: "<token>"
node-ip: "192.168.10.65"
```

`riscv-node-2`:

```text
sudo mkdir -p /etc/rancher/k3s
sudo vim /etc/rancher/k3s/config.yaml
```

config.yaml:

```text
server: "https://192.168.10.64:6443"
token: "<your_token_here>"
node-ip: "192.168.10.66"
```

dont forget the token, `on riscv-core` :

```bash
sudo cat /var/lib/rancher/k3s/server/token
```

reload everything, on `riscv-core`:

```bash
sudo systemctl daemon-reload
sudo systemctl restart k3s
```

on `riscv-node-1` & `riscv-node-2`:

```bash
sudo systemctl daemon-reload
sudo systemctl restart k3s-agent
```

back on `riscv-core`:

```bash
kubectl get nodes
```

![kubectl get nodes](assets/img/devlog-v7-k3s-getnodes.png)

success! kubernetes is now running on the new subnet.
check pods too:

![kubectl get pods](assets/img/devlog-v7-k3s-getpods.png)

all seems to be in order bar one, victoriametrics; which isnt really used for grafana.
metrics is mainly pulled using prometheus & node_exporter.. so i can safely ignore the warning
that the image for victoriametrics is not currently pulling.

kubernetes finished, the next phase is reconfiguring slurm and mpi

## fixing slurm node definitions

check slurm config in `slurm.conf`, ensure nothing routes to the old subnet.

```bash
sudo vim /etc/slurm/slurm.conf
```

this config uses hostnames which are correctly set in `/etc/hosts`.

now restart slurm:

```bash
sudo systemctl restart slurmctld
sudo systemctl restart slurmd
```

validate:

```bash
sinfo
squeue
```

## fixing mpi hostfiles

update mpi hostfile (e.g. `hosts-rv2`):

```bash
sudo vim ~/mpi/hosts-rv2
```

```text
192.168.10.65 slots=2
192.168.10.66 slots=2
```

test:

```bash
mpirun -np 4 --hostfile ~/mpi/hosts-rv2 ./mpi-test
```


## 7. final validation

### 7.1 kubernetes

```bash
kubectl get nodes -o wide
kubectl get pods -A
```

expect:

- all nodes `ready`
- pods `running`

### 7.2 slurm

```bash
sinfo
squeue
```

expect:

- nodes `idle` or `alloc`
- jobs run cleanly

### 7.3 mpi

```bash
mpirun -np 4 --host 192.168.10.65,192.168.10.66 ./mpi-test
```

expect:

- distributed jobs succeed
- no ssh / host resolution errors

### 7.4 registry

```bash
ctr images pull 192.168.10.64:5000/node-exporter:1.8.0-riscv64
docker pull 192.168.10.64:5000/node-exporter:1.8.0-riscv64
```

expect:

- pull succeeds
- no tls / san errors

## migration complete

finally finished! the rv2 cluster is now fully operational on the **192.168.10.x** subnet:

- **registry rebuilt**
- **tls san regenerated**
- **trust stores updated**
- **k3s / kubernetes fixed**
- **slurm fixed**
- **mpi fixed**
- **risc‑v images rebuilt + pushed**

done.