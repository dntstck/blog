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




<h1 id="slurm-riscv">Slurm on RISC-V</h1>

<p>venturing into running slurm and openmpi on my risc-v microcluster. this idea came to fruition simply through pure curiosity; i have already created a fully functioning risc-v cluster with kubernetes, docker, local container registry, required toolchains, prometheus, victoriametrics and grafana; essentially a datacenter in microformat. however i want to elevate this to not only micro-datacenter, but to micro-supercomputer and hpc environment by installing and running Slurm and openMPI.</p>

<h1 id="slurm-riscv">Why slurm?</h1>
<p>because while setting up a core node and x amount of nodes with kubernetes is essentially a cluster; slurm makes it a true cluster by assigning and sharing resources across each node; kubernetes merely does this with containers and while it does allocate resources it does not share them. slurm is the compute cluster, sharing cpu and resources while making the system feel like a symbiotic machine rather than a load of boards stuck together.</p>

<h1 id="slurm-riscv">is risc-v going to be a problem?</h1>
<p>yes it is but that is to be expected; this is a rather niche area ive stumbled into and even more so because it's hpc + risc-v. the only real issue i came across was mpi and slurm not working together properly but this was solved by building slurm 24 from source, linking it to openmpi + pmix and using mpirun instead of slurms srun as risc-v integration isnt quite there yet. but it still works.</p>

<h1 id="slurm-riscv">installing pmix</h1>
<p>
<code>wget https://github.com/openpmix/openpmix/releases/download/v4.2.9/pmix-4.2.9.tar.gz
tar xf pmix-4.2.9.tar.gz
cd pmix-4.2.9
./configure --prefix=/usr/local/pmix
make -j$(nproc)
sudo make install</code></p>

<h1 id="slurm-riscv">add to path</h1>
<p>
<code>echo 'export PMIX_INSTALL_PREFIX=/usr/local/pmix'           | sudo tee /etc/profile.d/pmix.sh
echo 'export LD_LIBRARY_PATH=/usr/local/pmix/lib:$LD_LIBRARY_PATH' | sudo tee -a /etc/profile.d/pmix.sh
echo 'export PATH=/usr/local/pmix/bin:$PATH'                | sudo tee -a /etc/profile.d/pmix.sh
source /etc/profile.d/pmix.sh</code></p>

<h1 id="slurm-riscv">install slurm pre-requisites</h1>
<p>
<code>sudo apt install libhwloc-dev libssl-dev libreadline-dev libpam0g-dev libmunge-dev munge libjson-c-dev libz-dev</code></p>


<h1 id="slurm-riscv">build & install slurm</h1>
<p>
<code>wget https://download.schedmd.com/slurm/slurm-24.05.3.tar.bz2\
tar xf slurm-24.05.3.tar.bz2
cd slurm-24.05.3
./configure --prefix=/usr/local/slurm
    --sysconfdir=/etc/slurm 
    --with-pmix=/usr/local/pmix 
    --with-munge
    --enable-pam
make -j$(nproc)
sudo make install</code></p>


<h1 id="slurm-riscv">add slurm to path</h1>
<p>
<code>echo 'export PATH=/usr/local/slurm/bin:/usr/local/slurm/sbin:$PATH' | sudo tee /etc/profile.d/slurm.sh
source /etc/profile.d/slurm.sh</code></p>



<h1 id="slurm-riscv">build & install openmpi</h1>
<p> here, we are limited to < 4.1.x as we need c++ bindings. these are deprecated in version 5x+ <br>
<code>wget https://download.open-mpi.org/release/open-mpi/v4.1/openmpi-4.1.6.tar.bz2
tar xf openmpi-4.1.6.tar.bz2
cd openmpi-4.1.6

./configure --prefix=/usr/local/openmpi
    --with-pmix=/usr/local/pmix 
    --with-slurm 
    --enable-mpi-cxx
make -j$(nproc)
sudo make install</code></p>



<h1 id="slurm-riscv">create a slurm control daemon service</h1>
<p> create this service on the core/controller node only.<br>
<code>sudo vim /etc/systemd/system/slurmctld.service</code>
<br>
unit file:<br>
<code>[Unit]
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
WantedBy=multi-user.target</code></p>



<h1 id="slurm-riscv">create slurm daemon service</h1>
<p>create this on the core/controller node; then copy it via scp to any worker nodes.<br>
<code>sudo vim /etc/systemd/system/slurmd.service</code><br>
unit file: <br>
<code>[Unit]
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
WantedBy=multi-user.target/code></p>

<h1 id="slurm-riscv">enable the unit files</h1>
<p>on the core:<br>
<code>sudo systemctl enable slurmctld
sudo systemctl enable slurmd
sudo systemctl start slurmctld
sudo systemctl start slurmd</code><br>
remaining nodes:<br>
<code>sudo systemctl enable slurmd
sudo systemctl start slurmd</code></p>

<h1 id="slurm-riscv">enable munge</h1>
<p>on all nodes:<br>
<code>sudo systemctl enable munge
sudo systemctl start munge</code><br>

<h1 id="slurm-riscv">test slurm</h1>
<p>on the core:<br>
<code>sinfo/code><br>
all the nodes should be listed as IDLE<br>
running our test program proves it:
<code>mpirun -np 3 --host riscv-core,riscv-node-1,riscv-node-2 ./hello\</code>
as we recieve a hello from rank 0 of 3 on each node.</p>








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
