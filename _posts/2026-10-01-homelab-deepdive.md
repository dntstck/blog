---
title: "homelab-deepdive"
date: 2026-10-07T20:21:39
publishDate: 2026-10-07T23:00:00
featured: true
devlog: false
tags: [homelab, x86, x64, riscv, linux]
---

# homelab deepdive

today i thought i would discuss my homelab, what it is, how i use it and what i do with it.
i have a lot of servers, nodes and workstations kicking about so i will do my best to document them accordingly.

## repositories

entire homelab is stored in a git repo, a visual compendium & reproducible manifest of my homelab.
the riscv supercomputer also has its own separate repo, for the same reason.

here is my homelab repo structure, each directory is a node with its corresponding ip (if it has one).

### homelab

```bash
├── [192.168.10.1]   - mikrotik rb2011 router
├── [192.168.10.xxx] - cisco 2960 poe 24 port ethernet switch
├── [192.168.10.4]   - mainframe
├── [192.168.10.100] - homelab-sentinel
├── [192.168.10.101] - vServer-buildFarm
├── [192.168.10.102] - vServer-k8sMaster
├── [192.168.10.103] - vServer-k8sNode1
├── [192.168.10.104] - vServer-k8sNode2
├── [192.168.10.105] - vServer-k8sNode3
├── [192.168.10.107] - vServer-rv2Control
├── [192.168.10.108] - vServer-microServices
├── [192.168.10.109] - vServer-edge
├── [192.168.10.112] - vServer-staticWeb
├── [192.168.10.113] - vServer-ciRunner
├── [192.168.10.114] - vServer-edgeRunner
├── [192.168.10.115] - vServer-selfHeal
├── [192.168.10.116] - vServer-reverseProxy
├── [192.168.10.117] - vServer-metricsFusion
├── [192.168.10.118] - vServer-certificateAuth
├── [192.168.10.119] - vServer-docHost
├── [192.168.10.120] - vServer-overseer
├── [192.168.10.121] - vServer-containerRegistry
├── [192.168.10.122] - vServer-exploitSandbox
├── [192.168.10.164] - gitserver
├── [192.168.10.23]  - cm4
├── [192.168.10.24]  - dev-x64
├── [192.168.10.252] - stream-x64
├── [192.168.10.254] - Elden_Ping
├── [192.168.10.64]  - riscv-core
├── [192.168.10.65]  - riscv-node-1
├── [192.168.10.66]  - riscv-node-2
├── [192.168.10.86]  - ai-core
├── [192.168.10.87]  - ai-1
├── [192.168.10.88]  - ai-2
├── [192.168.10.89]  - ai-3
├── [192.168.10.xxx] - cisco 2960 24 port ethernet switch (backplane)
└── [scripts]
```

the directories of each node corresponds to its root folder (/) so anything placed in `/opt` or say `/usr/bin` on the node,
would be found in its corresponding folder in the repo. however this only applies to files i have altered such as hosts or fstab,
any base system files or anything left as its default for base install will not be found here.

most nodes are fairly self explanatory. anything prefixed with `vServer` dictates that its a virtual server running from proxmox.
the mainframe and all nodes tagged with vServer form part of a virtual living system, which manages itself and my homelab.
to explain it fully, i will need an entire blog post; so stay tuned for that one!

everything else is fairly easy to work out;
riscv-core, riscv-node-1 and riscv-node-2 is my riscv supercomputer.
ai-core, ai-1, ai-2 & ai-3 are a wyse 3040 (ai-core) and 3 luckfox pico max sbcs. wyse node is the core and the luckfoxes are the nodes.
the luckfoxes run ubuntu and a micro llm on each with just 256mb ram. i featured a post on the blog about it recently.
cm4 is the home media center.
homelab-sentinel is a spare wyse 3040 running debian that i plan on turning into a monitoring node for the entire fleet.
and that pretty much sums it up for node explanation.


### riscv-core

```bash
├── bin
├── docker
│   ├── machines
│   │   ├── c-build
│   │   └── rust-build
│   ├── observability
│   │   ├── blackbox
│   │   ├── grafana
│   │   ├── kube-state-metrics
│   │   ├── loki
│   │   ├── node_exporter
│   │   ├── promtail
│   │   └── victoriametrics
│   └── services
│   ├── discovrs
│   ├── gitea
│   └── microservice-http
├── docs
├── k8s
│   ├── argocd
│   ├── ci
│   ├── db
│   ├── ingress
│   │   ├── canary
│   │   └── coredns
│   ├── local-path
│   ├── observability
│   │   └── old
│   ├── registry
│   ├── services
│   │   └── gitea
│   ├── systems
│   ├── tests
│   ├── traefik
│   └── vault
├── lxd
│   └── profiles
├── mpi
├── scripts
│   └── nvme_exporter
│   ├── src
│   └── target
├── slurm
└── sys
├── alpine-riscv
│   ├── bin
│   ├── dev
│   ├── etc
│   ├── home
│   ├── lib
│   ├── media
│   ├── mnt
│   ├── opt
│   ├── proc
│   ├── root
│   ├── run
│   ├── sbin
│   ├── srv
│   ├── sys
│   ├── tmp
│   ├── usr
│   └── var
└── rs-alpine-riscv
├── alpine-riscv
├── bin
├── dev
├── etc
├── home
├── lib
├── media
├── mnt
├── opt
├── proc
├── root
├── run
├── sbin
├── srv
├── sys
├── tmp
├── usr
└── var
```

riscv-core repo follows a similar method; except that it does not correspond to the nodes root (/), it could be kept in /home/ 
or even `opt`, it would not matter as unlike the homelab repo, this one can be launched from any part of the system
 and it would not matter as any config files are stored inside the repo folder; rather than the system itself.

the only other difference between the two repos is nothing is stored in the riscv-core, riscv-node-1 and riscv-node-2 dirs of homelab repo
it would get far too confusing, be redundant as well as a waste of storage. 

## machines

### mainframe

`12gb ram, 500gb hdd, proxmox`

the mainframe is the backbone of my virtual infrastructure. it’s just an old optiplex i upgraded with more ram,
 but it runs every vServer in the homelab & despite the age, proxmox runs flawlessly on it.
 alpine vms keep resource usage low enough that i can comfortably run 20+ virtual nodes without issue. 
not powerful, but reliable, predictable and stable.

### stream‑x64 (laptop)

`4gb ram, 60gb emmc, debian 12`

stream‑x64 is the lightweight dev node. it is used for:

- writing code
- editing blog posts
- managing repos
- pushing commits
- running small scripts
- testing containers locally

with only 4gb ram and a small emmc, its not designed for anything heavy. 
its more of a portable dev node. everything done here is pushed to the gitserver for the rest of the system to consume.
the added bonus is being a laptop; i can use it anywhere in the house and access my subnet by simply joining my access point.

### dev‑x64 (am1 workstation)

`8gb ram, 500gb hdd (windows xp), 240gb ssd (debian 12)`

dev‑x64 is the stable development machine. it handles:

- larger builds
- multi‑monitor workflows
- legacy windows xp x64 software
- debian development
- container creation
- testing microservices

the dual‑boot setup allows me to run old software at native performance while still having a modern linux environment for development.

### rv2 supercomputer

`8gb ram per node, 128gb nvme per node, ubuntu server`

the rv2 cluster handles all heavy compute:

- risc‑v builds
- mpi workloads
- slurm jobs
- kubernetes deployments
- container builds
- observability stack
- registry hosting

anything that requires speed, parallelism or architecture‑specific testing is offloaded to rv2. 
this keeps the dev machines responsive and ensures that heavy workloads never interfere with day‑to‑day development.
 
### gitserver

`2gb ram, 500gb hdd, debian 12`

code, manifests, configs and repos flow through the gitserver. 
it acts as the source of truth, the root of all knowledge and the core of all:

- dev machines push code
- vservers pull code for ci
- rv2 pulls code for builds
- kubernetes pulls manifests
- blog pulls updates

### ai cluster

`wyse 3040 - 2gb ram, 8gb emmc`
`luckfox pico max- 256mb ram, 32gb sd card`

the ai cluster is the smallest part of the homelab, but it has a very specific purpose.
 it consists of one wyse 3040 thin client and three luckfox pico max sbcs. despite their extremely limited hardware,
 they form a functional micro‑llm cluster that handles lightweight inference tasks.

the wyse 3040 acts as the control node. the luckfox boards act as compute nodes. each luckfox has only 256mb ram, but they run ubuntu minimal and a tiny microllm model without issue.
the ai cluster is not designed for heavy workloads. instead, it handles; small inference tasks, lightweight text generation, microservice integration,
testing llm behaviour on constrained hardware & experimentation with low-power compute.

### homelab-sentinel

this is a stock wyse 3040 i installed debian to, its fairly new as a node. was gathering dust before i decided to make use of it; eventually it will be an "overseer" of the entire fleet,
monitoring each node, sending emails when something goes down, doesnt compile, fails to run.. etc.

### vServers

anything prefixed with vServer is a virtual node that is run from proxmox. the nodes are self explanatory, all run alpine, all usually only have 1-2gb of ram and 30gb storage.
the only exception is buildFarm, which has 4gb of ram and 100gb storage as it runs heavy compilation jobs.

## networking

the homelab relies heavily on its network backbone. without the mikrotik router and the two cisco catalyst 2960 switches,
 none of the nodes, vservers or clusters would be able to communicate. the network layer is the foundation for everything else.
the network backbone consists of:

- mikrotik rb2011 router
- cisco catalyst 2960 poe switch
- cisco catalyst 2960 backplane switch

the mikrotik handles routing, dhcp, firewall rules and vlan segmentation. the cisco switches handle all internal traffic, power delivery (poe) and backplane connectivity between nodes.

### traffic flow

traffic in the homelab is as such:

- mikrotik handles ingress/egress
- cisco poe switch handles primary node traffic
- cisco backplane switch handles secondary and isolated traffic; mainly from the riscv cluster
- mainframe routes vserver workloads
- rv2 cluster communicates internally over dedicated links, but can also communicate to itself through the backplane using its second nics.

### segmentation

the homelab uses basic segmentation:

- management traffic
- compute traffic
- media traffic
- ai cluster traffic
- rv2 cluster traffic

this prevents noisy workloads from interfering with critical systems. the rv2 cluster, for example, can be isolated to its backplane so mpi, slurm and k3s traffic never collide with vserver workloads.
my network is very simple; no complex vlans, no heavy firewall rules, no enterprise features, just clean, simple routing & switching.
simplicity is intricacy i say. also if something breaks, it can be diagnosed quickly.


### storage & data flow

each machine handles its own storage:

- stream‑x64 → 60gb emmc
- dev‑x64 → 500gb hdd (xp) + 240gb ssd (debian)
- mainframe → 500gb hdd
- rv2 cluster → nvme drives on each node
- ai cluster → minimal flash storage
- cm4 → sd card

none of these are large, but they are more than enough for alpine vms, containers, manifests, configs and small workloads.

the rv2 cluster is the only part of the homelab with high‑speed storage. nvme is required for building binaries, running mpi workloads and hosting the private registry.

### registry storage

the private container registry lives on rv2:

```
/srv/nvme/registry
```

this is where all risc-v containers for kubernetes, slurm, microservices and dev pods are stored. the registry is the central artifact store for the entire riscv section of my homelab.


### data flow between machines

data moves through the homelab in a predictable pattern:

- dev machines push code to gitserver
- vservers pull code for ci, builds and deployments
- registry stores containers
- kubernetes pulls containers from registry
- rv2 cluster pulls containers for hpc workloads
- observability stack stores logs and metrics
- blog pulls updates from github pages

## dev workflow 

the workflow is fairly straightforward:
 code or write wherever on the laptop >
 push to gitserver >
 pull from a different node, say rv2 cluster >
 compile heavy project >
 push binaries to gitserver >
 pull to required node.

this can apply to scripts, codebases, large projects, small projects or even blog posts.
im not just limited to the workstations or laptop either; using my phone and access point i can hop onto any node via ssh, write/run code, push/pull git repos... etc

### logs & metrics

logs flow into loki.
metrics flow into prometheus & node_exporter.
grafana reads both.

simple. i have grafana dashboards for the risc-v cluster, one for general and one solely for kubernetes. i am yet to build one for the entire homelab but it is on my todo list
(tbh, im dreading it because its going to be maaaaassive!)

## final thoughts

well, that is my homelab in its entirety. every node, repo and cluster plays its part, and together they form the environment i develop & grow in. 
not perfect by any means but its mine and it does exactly what i need it to. 