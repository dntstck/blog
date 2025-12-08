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




<h2 class="atx" id="📝-devlog-v7--2025-12-08-">📝 devlog v7 [ 2025-12-08 ]</h2>
<ul>
<p>installing btop on luckfox max to monitor constraints</p><br>
<p><code>sudo apt install g++ cmake git git clone https://github.com/aristocratos/btop.git cd btop &amp;&amp; git checkout v1.2.13 make sudo make install</code><br>
build failed - requires c++23. too heavy for this sbc<br>
reverted to version v.1.2.13 <br> - <code>git checkout v1.2.13</code>
</p>

<h3 class="atx" id="🔍-insights">🔍 insights</h3>
<ul>
<p>luckfox pico max :</p>
<li><table>
<thead>
<tr>
<th><strong>SoC</strong></th>
<th>Rockchip RV1106 – IPC visual processing SoC</th>
</tr>
</thead>
<tbody><tr>
<td><strong>CPU</strong></td>
<td>ARM Cortex‑A7, single‑core, 32‑bit, up to 1.2 GHz</td>
</tr>
<tr>
<td><strong>NPU</strong></td>
<td>1 TOPS, supports INT4/INT8/INT16 mixed operations</td>
</tr>
<tr>
<td><strong>RAM</strong></td>
<td>256 MB DDR3L (integrated)</td>
</tr>
<tr>
<td><strong>Flash Storage</strong></td>
<td>256 MB SPI flash</td>
</tr>
<tr>
<td><strong>Expandable Storage</strong></td>
<td>microSD slot (bootable)</td>
</tr>
<tr>
<td><strong>USB</strong></td>
<td>1× USB host, 1× USB OTG</td>
</tr>
<tr>
<td><strong>Ethernet</strong></td>
<td>10/100 Mbps</td>
</tr>
<tr>
<td><strong>Video ISP</strong></td>
<td>4M @ 30fps ISP with HDR, 3A, 3DNR, gamma correction</td>
</tr>
<tr>
<td><strong>OS Support</strong></td>
<td>Buildroot and Ubuntu 22.04</td>
</tr>
<tr>
<td><strong>Other Features</strong></td>
<td>Integrated audio codec, MAC PHY, hardware ISP accelerators</td>
</tr>
</tbody></table>
</li>
<p>compile speeds for btop:</p>

<li><p><code>Compiling btop.cpp 10% -&gt; obj/btop.o (1.8MiB) (01m:08s) <br>
Compiling btop_config.cpp 20% -&gt; obj/btop_config.o (1.4MiB) (55s) <br>
Compiling btop_draw.cpp 30% -&gt; obj/btop_draw.o (2.3MiB) (01m:16s) <br>
Compiling btop_input.cpp 40% -&gt; obj/btop_input.o (1.4MiB) (55s)  <br>
Compiling btop_menu.cpp 50% -&gt; obj/btop_menu.o (2.0MiB) (01m:06s)  <br>
Compiling btop_shared.cpp 60% -&gt; obj/btop_shared.o (1.8MiB) (01m:04s)  <br>
Compiling btop_theme.cpp 70% -&gt; obj/btop_theme.o (1.4MiB) (53s) <br>
Compiling btop_tools.cpp 80% -&gt; obj/btop_tools.o (1.4MiB) (59s) <br>
Compiling linux/btop_collect.cpp 90% -&gt; obj/linux/btop_collect.o (3.1MiB) (01m:30s) <br>

Linking and optimizing binary... 100% -&gt; bin/btop (1004KiB) (07m:31s)

Build complete in (17m:25s)</code></p>
</li>
</ul>





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
