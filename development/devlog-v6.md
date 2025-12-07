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




<h1 id="devlog-v6">📝 devlog v6 [ 2025-12-07 ]</h1>

<p>- concern arising from space available on microcluster nodes <br>
- native emmc has ~1.81gb space free on both nodes, most likely logs, crash dumps, apt cache and unused/stopped containers <br>
- decided to utilise bash & cron by writing a simple script that compresses old logs, cleans apt cache, removes any build artifacts, old kernels, containers and temp files<br>
- this will run everyday at midnight on both nodes.<br></p>

<h1 id="devlog-v6">🔍 insights</h1>
<p>- realised my crontab wasnt working; remembered i did not run crontab -e as sudo/root, which means it only ran for the current user. some of the script commands require root priveleges therefore script would fail.<br><br>
  
- these nodes are at the limit i can push already for running a small microcluster; which is my reasoning for using external nvme drives via usb. ssds would hit the same usb 2.0 bottleneck and have a smaller form factor; using nvme drives also means i can utilise some coolers i have lying around, which will keep the drives at a very cool temperature.<br><br>
  
- by removing logs and unused artifacts i freed up over a gb of space and careful use will keep the cluster nodes at around 2.80gb free; which is viable for my purposes:<br><br>
  
  only build rust projects on the core node. being a cm5 it will compile them faster with its extra ram and native nvme speeds.<br><br>
  
  c projects can be built on both nodes, as gcc uses much less space, mcu code could also be compiled and flashed here as picotool uses minimal space also<br><br>
  
  any large projects, code or even containers could be stored on the external nvme drives, keeping the nodes emmc at a useable 2.80gb<br></p>






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
