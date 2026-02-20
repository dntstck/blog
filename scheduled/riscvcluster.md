---
title: "riscvcluster"
date: 2026-02-20T04:07:52Z
publishDate: 2026-02-19T00:00:00Z
tags: [misc]
---

<h1 id="riscvcluster">risc-v distributed compute cluster - notes from a small, intentional datacenter</h1>

for the past few months ive been building a microcluster/mini datacenter at home. however this isn't your usual cluster or server build. it's entirely in risc-v.<br>

i wanted to build this for a few reasons:<br>

to challenge myself<br>
to experience risc-v on native hardware<br>
experimentation<br>
rust & risc-v development<br>
to further my knowledge of clustered environments, kubernetes & docker.<br>

this post is a short overview of the cluster, the design choices behind it, and what I learned from running real workloads on non‑x86 hardware.<br>

the cluster consists of:<br>

    3× orange pi rv2 (8gb ram) <br>

    nvme storage (2x nvme slots per node) <br>

    dual gbe networking (2x gbe nic per node) <br>

    poe power via a tp-link switch <br>

    custom microrack built from a modified phanteks hdd cage <br>
    
    5v usb-c poe splitters powering each node <br>

each node sits on its own tray, making the whole system feel like a miniature datacenter: modular, accessible, and intentionally designed. <br>

<h2>networking & topology<h2>

the cluster uses:<br>

    multi‑nic networking <br>

    per‑node static addressing <br>

    clean, predictable dns <br>

    local registry for architecture‑specific container builds <br>

    dedicated management network for ssh, metrics, and orchestration <br>

the goal here wasn’t speed, more cohesion and i wanted a cluster that behaved like a single organism, not three boards taped together. <br>

software stack: <br>

every node runs a minimal ubuntu server linux environment (not my ideal choice; but its what the board supports right now) with: <br>

    kubernetes (recompiled for RISC‑V) <br>

    prometheus + victoriametrics <br>

    grafana <br>

    private container registry & custom certificates (CA/SAN) <br>

    rust‑based microservices <br>

    custom NVMe metrics exporter i wrote in rust for testing i/o behaviour and because this kernel doesn't expose nvme temps natively <br>

entire stack is built from source where possible because risc-v support is still uneven and reproducibility matters <br>

one of the main goals of this cluster was to explore: <br>

    cross‑compilation <br>

    architecture‑specific debugging <br>

    reproducible builds <br>

    behaviour differences between risc-v, arm, and x86 <br>

    how distributed workloads behave on low‑power hardware <br>


to test the cluster, i wrote several small Rust microservices: <br>

    simple message‑passing workloads <br>

    storage‑heavy tasks <br>

    cpu‑bound tasks <br>

    mixed workloads to test scheduling behaviour <br>

also built a custom nvme exporter to measure: <br>

    latency <br>

    throughput <br>

    queue depth <br>

    thermal behaviour <br>

    consistency under load <br>

this gave me a real sense of how risc-v behaves under distributed pressure.. not theoretical benchmarks, but actual system behaviour. <br>

i care a lot about observability, so the cluster exposes: <br>

    cpu <br>

    memory <br>

    network <br>

    nvme <br>

    container metrics <br>

    orchestration metrics <br>

    custom Rust exporter data <br>

grafana dashboards reflect the living state of the cluster. <br>

what i learned: <br>

    risc-v is absolutely viable for real distributed workloads, not just hobby boards. <br>

    toolchain consistency matters more than raw performance. <br>

    kubernetes on RISC‑V works, but you need to build it yourself. <br>

    small clusters teach you more than big ones because every detail is visible. <br>

this project wasn’t about building something powerful, massive ram numbers, a huge amount of storage or raw cpu power, it was about building something honest, cohesive, and expressive; a system that reflects how i think about engineering. <br>
