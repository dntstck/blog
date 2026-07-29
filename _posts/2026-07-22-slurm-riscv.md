---
title: "slurm-riscv"
date: 2026-07-22T04:58:17Z
publishDate: 2026-07-25T00:00:00Z
featured: false
tags: [riscv, linux, hpc, slurm]
---

# slurm on risc-v

venturing into running slurm and openmpi on my risc-v microcluster. 
this idea came to fruition simply through pure curiosity; i have already created a fully functioning risc-v cluster with:

- kubernetes
- docker 
- local container registry 
- required toolchains
- prometheus
- victoriametrics
- grafana 

essentially a datacenter in microformat.
 
however i want to elevate this to not only micro-datacenter, but to micro-supercomputer and hpc environment by installing and running Slurm and openMPI.

## why slurm?
because while setting up a core node and x amount of nodes with kubernetes is essentially a cluster;
slurm makes it a true cluster by assigning and sharing resources across each node.
kubernetes merely does this with containers and while it does allocate resources it does not share them.
 slurm is the compute cluster, sharing cpu and resources while making the system feel like a symbiotic machine rather than a load of boards stuck together.

## is risc-v going to be a problem?
yes it is but that is to be expected; this is a rather niche area ive stumbled into and even more so because it's hpc + risc-v. the only real issue i came across was mpi and slurm not working together properly but this was solved by building slurm 24 from source, linking it to openmpi + pmix and using mpirun instead of slurms srun as risc-v integration isnt quite there yet. but it still works.

## installing pmix

```bash 
wget https://github.com/openpmix/openpmix/releases/download/v4.2.9/pmix-4.2.9.tar.gz
tar xf pmix-4.2.9.tar.gz
cd pmix-4.2.9
./configure --prefix=/usr/local/pmix
make -j$(nproc)
sudo make install
```

## adding to path

```bash
echo 'export PMIX_INSTALL_PREFIX=/usr/local/pmix'           | sudo tee /etc/profile.d/pmix.sh
echo 'export LD_LIBRARY_PATH=/usr/local/pmix/lib:$LD_LIBRARY_PATH' | sudo tee -a /etc/profile.d/pmix.sh
echo 'export PATH=/usr/local/pmix/bin:$PATH'                | sudo tee -a /etc/profile.d/pmix.sh
source /etc/profile.d/pmix.sh
```

## install slurm pre-requisites

```bash 
sudo apt install libhwloc-dev libssl-dev libreadline-dev libpam0g-dev libmunge-dev munge libjson-c-dev libz-dev
```

## build & install slurm

```bash 
wget https://download.schedmd.com/slurm/slurm-24.05.3.tar.bz2
tar xf slurm-24.05.3.tar.bz2
cd slurm-24.05.3
./configure --prefix=/usr/local/slurm
    --sysconfdir=/etc/slurm 
    --with-pmix=/usr/local/pmix 
    --with-munge
    --enable-pam
make -j$(nproc)
sudo make install
```

## adding slurm to path

```bash 
echo 'export PATH=/usr/local/slurm/bin:/usr/local/slurm/sbin:$PATH' | sudo tee /etc/profile.d/slurm.sh
source /etc/profile.d/slurm.sh
```

## build & install openmpi

 here, we are limited to < 4.1.x as we need c++ bindings. these are deprecated in version 5x+ 
```bash 
wget https://download.open-mpi.org/release/open-mpi/v4.1/openmpi-4.1.6.tar.bz2
tar xf openmpi-4.1.6.tar.bz2
cd openmpi-4.1.6

./configure --prefix=/usr/local/openmpi
    --with-pmix=/usr/local/pmix 
    --with-slurm 
    --enable-mpi-cxx
make -j$(nproc)
sudo make install
```

## create a slurm control daemon service

create this service on the core/controller node only.

```bash 
sudo vim /etc/systemd/system/slurmctld.service
```
unit file:

```bash 
[Unit]
Description=Slurm controller daemon
After=network.target munge.service
ConditionPathExists=/etc/slurm/slurm.conf

[Service]
Type=simple
User=slurm
Group=slurm
ExecStart=/usr/local/slurm/sbin/slurmctld -D
ExecReload=/bin/kill -HUP $MAINPID
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target

```

## create slurm daemon service

create this on the core/controller node; then copy it via scp to any worker nodes.

```bash 
sudo vim /etc/systemd/system/slurmd.service
```

unit file: 

```bash 
[Unit]
Description=Slurm node daemon
After=network.target munge.service
ConditionPathExists=/etc/slurm/slurm.conf

[Service]
Type=simple
User=root
ExecStart=/usr/local/slurm/sbin/slurmd -D
ExecReload=/bin/kill -HUP $MAINPID
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

## enable the unit files

on the core:

```bash 
sudo systemctl enable slurmctld
sudo systemctl enable slurmd
sudo systemctl start slurmctld
sudo systemctl start slurmd
```

remaining nodes:

```bash 
sudo systemctl enable slurmd
sudo systemctl start slurmd
```

## enable munge

on all nodes:

```bash 
sudo systemctl enable munge
sudo systemctl start munge
```

## test slurm

on the core:

```bash 
sinfo
```

all the nodes should be listed as IDLE
& running our test program proves it:

```bash 
mpirun -np 3 --host riscv-core,riscv-node-1,riscv-node-2 ./hello
```
as we recieve a hello from rank 0 of 3 on each node.

now we have slurm running entirely on risc-v!
