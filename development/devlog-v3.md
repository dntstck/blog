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




<h1 id="devlog-v3">📝 devlog v3 [ 2025-12-02 ]</h1>

<p>- installing debian on a dell vostro a100 x64 machine, for a low powered (under 25w) NAS <br>
- staged sudo + passwd for clean privilege escalation <br>
- xfce4 + lightdm layered, surprisingly snappy on SSD <br>
- pci gigabit nic installed, static ip locked in via systemd networking <br>
- external drive detected (600gb + 300gb), planning resize + cleanup before samba shares <br>
- zsh + oh-my-zsh + powerlevel10k + jetbrains mono nerd font staged for shell expressiveness <br>
- btop tested, smooth even on legacy hardware<br></p>

<h1 id="devlog-v3">🔍 insights</h1>
<p>- netinst failed, hangs at ISOLINUX; meaning bootloader cant find kernel<br>
- switched USB drives to sandisk, attempted again<br>
- used DVD iso in place of netinst<br>
- switched to text based install, graphical shung at 97%<br>
- text based install hung again at 97%, reinstall with basic sysutils & ssh only.<br>
- install succeeeded. proceeded to install xfce, lightdm.<br>
- xfce responsiveness exceeded expectations on legacy hardware<br>




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
