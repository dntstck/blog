---
title: "riscv-microcluster"
date: 2026-07-22T04:48:04Z
publishDate: 2026-07-25T00:00:00Z
featured: false
devlog: false
tags: [riscv, linux, hpc, orangepi]
---

# risc-v distributed compute cluster - notes from a small, intentional datacenter

for the past few months ive been building a microcluster/mini datacenter at home. however this isn't your usual cluster or server build. it's entirely in risc-v.

i wanted to build this for a few reasons:

to challenge myself, to experience risc-v on native hardware, experimentation, rust & risc-v development, to further my knowledge of clustered environments, kubernetes & docker.

this post is a short overview of the cluster, the design choices behind it, and what I learned from running real workloads on non‑x86 hardware.

the cluster consists of:

- 3× orange pi rv2 (8gb ram) 
- nvme storage (2x nvme slots per node)
- dual gbe networking (2x gbe nic per node)
- poe power via a tp-link switch
- custom microrack built from a modified phanteks hdd cage
- 5v usb-c poe splitters powering each node 

each node sits on its own tray, making the whole system feel like a miniature datacenter: modular, accessible, and intentionally designed. 

## networking & topology

the cluster uses:

- multi‑nic networking
- per‑node static addressing
- clean, predictable dns 
- local registry for architecture‑specific container builds 
- dedicated management network for ssh, metrics, and orchestration 

the goal here wasn’t speed, more cohesion and i wanted a cluster that behaved like a single organism, not three boards taped together. 


## software stack

every node runs a minimal ubuntu server linux environment (not my ideal choice; but its what the board supports right now) with: 

- kubernetes (recompiled for RISC‑V) 
- prometheus + victoriametrics
- grafana
- private container registry & custom certificates (CA/SAN) 
- rust‑based microservices 
- custom NVMe metrics exporter i wrote in rust for testing i/o behaviour and because this kernel doesn't expose nvme temps natively  
    

entire stack is built from source where possible because risc-v support is still uneven and reproducibility matters 

one of the main goals of this cluster was to explore: 

- cross‑compilation
- architecture‑specific debugging
- reproducible builds
- behaviour differences between risc-v, arm, and x86
- how distributed workloads behave on low‑power hardware 


to test the cluster, i wrote several small Rust microservices: 

- simple message‑passing workloads
- storage‑heavy tasks
- cpu‑bound tasks
- mixed workloads to test scheduling behaviour 

also built a custom nvme exporter to measure: 

- latency
- throughput
- queue depth
- thermal behaviour
- consistency under load 

this gave me a real sense of how risc-v behaves under distributed pressure.. not theoretical benchmarks, but actual system behaviour. 

i care a lot about observability, so the cluster exposes: 

- cpu
- memory
- network
- nvme
- container metrics
- orchestration metrics
- custom Rust exporter data

grafana dashboards reflect the living state of the cluster. 


## what i learned

- risc-v is absolutely viable for real distributed workloads, not just hobby boards.
- toolchain consistency matters more than raw performance.
- kubernetes on RISC‑V works, but you need to build it yourself.
- small clusters teach you more than big ones because every detail is visible.

this project wasn’t about building something powerful, massive ram numbers, a huge amount of storage or raw cpu power, it was about building something honest, cohesive, and expressive; a system that reflects how i think about engineering. 
