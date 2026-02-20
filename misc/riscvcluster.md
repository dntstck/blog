<!-- Header -->
<link rel="stylesheet" href="../../assets/css/style.css"/>
<div align="center">    
  <a href="../"><img alt="Dev Blog" src="https://img.shields.io/badge/-Developer%20Blog-FE7A16?&logo=git&logoColor=white"></a><br><br></div> 

<div align="center"><a href="../"><img alt="Home" src="https://img.shields.io/badge/-Home-151515?&logo=Arduino&logoColor=C51A4A"></a> <a href="../development"><img alt="Devlogs" src="https://img.shields.io/badge/-Devlogs-151515?&logo=git&logoColor=C51A4A"></a> <a href="../picosystem"><img alt="PicoSystem" src="https://img.shields.io/badge/-PicoSystem-151515?&logo=raspberrypi&logoColor=C51A4A"></a> <a href="../devserver"><img alt="Dev Server" src="https://img.shields.io/badge/-Dev%20Server-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="../rust"><img alt="Rust" src="https://img.shields.io/badge/-Rust-151515?&logo=rust&logoColor=C51A4A"></a> <a href="../gamedev"><img alt="Game Development" src="https://img.shields.io/badge/-Game%20Development-151515?&logo=steam&logoColor=C51A4A"></a> <a href="../misc"><img alt="Misc" src="https://img.shields.io/badge/-Misc-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="../raspberrypi"><img alt="Pi" src="https://img.shields.io/badge/-Raspberry%20Pi-151515?&logo=Raspberry-Pi&logoColor=C51A4A"></a>
<a href="../microcontrollers"><img alt="Microcontrollers" src="https://img.shields.io/badge/-Microcontrollers-151515?&logo=Arduino&logoColor=FE7A16"></a>
<a href="../embedded"><img alt="Embedded" src="https://img.shields.io/badge/-Embedded-151515?&logo=C&logoColor=8a3f8f"></a>
<a href="../webdev"><img alt="Web Dev" src="https://img.shields.io/badge/-Web%20Development-151515?&logo=html5&logoColor=DD4814"></a></div>
<hr>
<div id="blog-post">
<!-- Main --> 




<h1 id="riscvcluster">risc-v distributed compute cluster - notes from a small, intentional datacenter</h1>

<p>for the past few months ive been building a microcluster/mini datacenter at home. however this isn't your usual cluster or server build. it's entirely in risc-v.</p><br>

<p>i wanted to build this for a few reasons:<br>

to challenge myself<br>
to experience risc-v on native hardware<br>
experimentation<br>
rust & risc-v development<br>
to further my knowledge of clustered environments, kubernetes & docker.<br></p>

<p>this post is a short overview of the cluster, the design choices behind it, and what I learned from running real workloads on non‑x86 hardware.<br>

the cluster consists of:<br>

    3× orange pi rv2 (8gb ram) <br>

    nvme storage (2x nvme slots per node) <br>

    dual gbe networking (2x gbe nic per node) <br>

    poe power via a tp-link switch <br>

    custom microrack built from a modified phanteks hdd cage <br>
    
    5v usb-c poe splitters powering each node <br>

each node sits on its own tray, making the whole system feel like a miniature datacenter: modular, accessible, and intentionally designed. </p><br>

<h2>networking & topology</h2>
<p>
the cluster uses:<br>

    multi‑nic networking <br>

    per‑node static addressing <br>

    clean, predictable dns <br>

    local registry for architecture‑specific container builds <br>

    dedicated management network for ssh, metrics, and orchestration <br>

the goal here wasn’t speed, more cohesion and i wanted a cluster that behaved like a single organism, not three boards taped together. <br>
</p>

<h2>software stack</h2>
<p>
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
</p>

<p>to test the cluster, i wrote several small Rust microservices: <br>

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

grafana dashboards reflect the living state of the cluster. </p><br>


<h2>what i learned</h2>
<p>

    risc-v is absolutely viable for real distributed workloads, not just hobby boards. <br>

    toolchain consistency matters more than raw performance. <br>

    kubernetes on RISC‑V works, but you need to build it yourself. <br>

    small clusters teach you more than big ones because every detail is visible. <br>

this project wasn’t about building something powerful, massive ram numbers, a huge amount of storage or raw cpu power, it was about building something honest, cohesive, and expressive; a system that reflects how i think about engineering.</p> <br>



<br>
<!-- Footer -->


<br>
<div align="center"><hr>
  <a href="../"><img alt="Blog" src="https://img.shields.io/badge/-Developer%20Blog-DD4814?style=flat-square&logo=github&logoColor=black"></a> 
  <a href="https://github.com/dntstck"><img alt="GitHub" src="https://img.shields.io/badge/-@dntstck-181717?style=flat-square&logo=GitHub&logoColor=white"></a> 
  <a href="https://www.linkedin.com/in/drudelarosa"><img alt="LinkedIn" src="https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=Linkedin&logoColor=white"></a> 
  <a href="https://orcid.org/0009-0003-6755-7655"><img alt="ORCID" src="https://img.shields.io/badge/-ORCID-A6CE39?style=flat-square&logo=ORCID&logoColor=white"></a> 
  <a href="https://stackoverflow.com/users/28874348/dru-delarosa"><img alt="Stack Overflow" src="https://img.shields.io/badge/-Stack%20Overflow-FE7A16?style=flat-square&logo=Stack-Overflow&logoColor=white"></a>
</div>
