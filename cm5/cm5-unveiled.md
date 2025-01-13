<!-- Header -->
<link rel="stylesheet" href="../../assets/css/style.css"/>
<div align="center">    
  <a href="../"><img alt="Dev Blog" src="https://img.shields.io/badge/-Developer%20Blog-FE7A16?&logo=git&logoColor=white"></a><br><br></div> 

  <div align="center">
    <a href="../"><img alt="Home" src="https://img.shields.io/badge/-Home-151515?&logo=Arduino&logoColor=C51A4A"></a> 
    <a href="/blog/cm5"><img alt="Pi" src="https://img.shields.io/badge/-CM5-151515?&logo=raspberrypi&logoColor=C51A4A"></a> 
    <a href="/blog/picosystem"><img alt="PicoSystem" src="https://img.shields.io/badge/-PicoSystem-151515?&logo=raspberrypi&logoColor=C51A4A"></a> 
    <a href="/blog/devserver"><img alt="Dev Server" src="https://img.shields.io/badge/-Dev%20Server-151515?&logo=Ubuntu&logoColor=C51A4A"></a> 
    <a href="/blog/osnetworking"><img alt="OS & Networking" src="https://img.shields.io/badge/-OS%20&%20Networking-151515?&logo=freebsd&logoColor=C51A4A"></a> 
    <a href="/blog/thoughts"><img alt="Thoughts" src="https://img.shields.io/badge/-Thoughts-151515?&logo=linux&logoColor=C51A4A"></a> 
    <a href="/blog/misc"><img alt="Misc" src="https://img.shields.io/badge/-Misc-151515?&logo=Ubuntu&logoColor=C51A4A"></a> 
    <a href="/blog/raspberrypi"><img alt="Pi" src="https://img.shields.io/badge/-Raspberry%20Pi-151515?&logo=Raspberry-Pi&logoColor=C51A4A"></a>
    <a href="/blog/microcontrollers"><img alt="Microcontrollers" src="https://img.shields.io/badge/-Microcontrollers-151515?&logo=Arduino&logoColor=FE7A16"></a>
    <a href="/blog/embeddedc"><img alt="C & Embedded" src="https://img.shields.io/badge/-C%20&%20Embedded-151515?&logo=C&logoColor=8a3f8f"></a>
    <a href="/blog/webdev"><img alt="Web Dev" src="https://img.shields.io/badge/-Web%20Development-151515?&logo=html5&logoColor=DD4814"></a>
  </div>
<hr>
<div id="blog-post">
<!-- Main --> 



---
<h1
id="unveiling-the-compute-module-5-a-journey-through-innovation"><em>Unveiling
the Compute Module 5: A Journey Through Innovation</em></h1>
<figure>
<img src="/img/cm5-full.png" alt="Compute Module 5 Image" />
<figcaption aria-hidden="true">Compute Module 5 Image</figcaption>
</figure>
<p>Over the past two weeks, I’ve been diving deep into the capabilities
of the Compute Module 5 (CM5). From setting up a couple of IO boards,
installing NVMe, throwing together a case or two (because The Pi Hut ran
out of stock on the day I went to order, typical!) and eventually
setting up a Development Server that utilizes sandbox environments and
remote editing, this journey has been nothing short of fascinating!</p>
<p>I’m sort-of new to microcontrollers and embedded systems but I’ve
always been fascinated by them. One of my goals in programming is
becoming an embedded developer to some extent, even just as a hobbyist.
I’ve always known of the Raspberry Pi, yet I never looked into it and
more fool me for not doing so because it seems like I’ve missed out on
quite a fair bit. After delving deep, realizing the potential of these
SBCs, SOMs, and Microcontrollers, buying a few Picos to play around with
(which I enjoyed immensely), I put some money aside and waited until the
new year. My birthday is a day after New Year’s Day, so it was the
perfect time to buy a mid-range CM5 and a few other bits and pieces I
wanted to tinker with (there’s a post coming for that). I did intend on
buying the Pi 5, but after careful consideration, I decided on the
Compute Module 5 because of its improved capabilities. It errs more to
my side of development rather than general use, and as the CM5 is a
drop-in replacement for the CM4, I reasoned it’d be best to buy a CM5 as
most of the CM4 kit is backward compatible. Very glad I did too! I’ll
post the specs at the end of this post for those that are
interested.</p>
<h2 id="initial-setup"><em>Initial Setup</em></h2>
<p>My first step was setting up an IO board with the CM5, complete with
a 128GB NVMe drive and Power over Ethernet (PoE) for streamlined power.
After a few hours of tinkering and building DIY cases (since I wasn’t
keen on running the CM5 bare), I managed to get the CM5 up and running
with the 64-bit Raspbian OS. Yet I couldn’t get PoE to work. My switch
was on (supports PoE), had the right voltage, and I used a brand-new
Cat5E Ethernet cable yet nothing I tried worked!</p>
<h4 id="poe-dilemma"><em>PoE Dilemma</em></h4>
<p>After visiting the Waveshare website, I found that the CM4 Mini
Baseboard C does not support PoE. It was a massive shame, but the
official baseboard for the CM5 seems to support PoE to some extent,
according to The Pi Hut’s listing. So it may support PoE, just not
out-of-the-box. It’s fine, I’m happy to spare a few pennies on a HAT at
some stage to enable PoE and it’s not a massive requirement at the
minute, but will be useful when I buy a switch with more Ethernet ports
and have all my Ethernet-enabled devices connected.</p>
<figure>
<img src="/img/waveshare-1.jpeg"
alt="Waveshare CM4 Mini Base Board - No PoE" />
<figcaption aria-hidden="true">Waveshare CM4 Mini Base Board - No
PoE</figcaption>
</figure>
<h4 id="fashioning-a-case-and-nvme-drive"><em>Fashioning a Case and NVMe
Drive</em></h4>
<p>Now, I had the CM5 module installed on the official board. I quickly
fashioned a case using the cardboard box it came in. It doesn’t look too
bad but it doesn’t look great either! I was also able to install a 128GB
NVMe drive I bought, it’s a 2280 so it didn’t fit in the Waveshare board
which only supports a max of 2240, so maybe it was a happy accident it
didn’t support PoE after all. I’d never used NVMe before, so I was keen
to test it and I couldn’t believe the difference. The CM5 boots to login
within seconds! Faster than my main development machine (an Intel i5
Dell Optiplex I grabbed off eBay last year and put 8GB of RAM in).
Awesome.</p>
<figure>
<img src="/img/diy-case.png" alt="Compute Module 5 Image" />
<figcaption aria-hidden="true">Compute Module 5 Image</figcaption>
</figure>
<h4 id="ideas-envisioned">Ideas, envisioned</h4>
<p>My main idea with the CM5 was to utilize it as a development server,
or a home development network (I thought of this name and decided it
suited quite well), which uses Docker, Kubernetes et al., to create
containerized environments for any and all development projects I have
in the future. Using the write speeds of the NVMe and the 4GB of RAM
(yes, half the amount of my main machine but still sufficient) I can use
the power of the CM5 to develop locally, while still developing remotely
over SSH on my main development machine in sandbox environments that are
completely safe and unrestricted, as well as the ability to develop
applications that require specific environments to run.</p>
<h4 id="thoughts-on-os"><em>Thoughts on OS</em></h4>
<p>I did debate for some time over whether to use Ubuntu or Raspbian. As
a long-time Ubuntu (and Kubuntu) user, I really did sway towards using
Ubuntu but reasoned that as the Pi OS is developed solely for the Pi/CM,
it would be best to utilize that. I won’t see much of it graphically
anyways, but could do if I wanted to given the choice. Ubuntu Server
does not give me that choice so I stuck with Raspbian for power,
processing, and support, as well as the option of having a graphical
interface if I ever choose to use it.</p>
<h4 id="final-thoughts"><em>Final Thoughts</em></h4>
<h5 id="compute-module-5-specifications"><strong>Compute Module 5
Specifications:</strong></h5>
<ul>
<li><strong>Form Factor:</strong> 55 mm x 40 mm x 4.7 mm</li>
<li><strong>Processor:</strong> Broadcom BCM2712 Quad-Core Cortex-A76 @
2.4GHz</li>
<li><strong>Memory Options:</strong> 2GB, 4GB, 8GB LPDDR4-4267 SDRAM
with ECC</li>
<li><strong>Storage Options:</strong> eMMC: 0GB, 16GB, 32GB, or
64GB</li>
<li><strong>Connectivity:</strong>
<ul>
<li><strong>Gigabit Ethernet PHY</strong> supporting IEEE 1588</li>
<li><strong>Bluetooth 5.0, BLE</strong></li>
<li><strong>Wi-Fi 802.11 b/g/n/ac</strong></li>
<li><strong>1 × USB 2.0 port (high speed)</strong></li>
<li><strong>2 × USB 3.0 ports (supporting simultaneous 5Gbps
operation)</strong></li>
<li><strong>Up to 30 × GPIO supporting either 1.8V or 3.3V
signalling</strong></li>
<li><strong>Up to 5 × UART</strong></li>
<li><strong>Up to 5 × I2C</strong></li>
<li><strong>Up to 5 × SPI</strong></li>
<li><strong>1 × SDIO interface</strong></li>
<li><strong>1 × DPI (parallel RGB display)</strong></li>
<li><strong>1 × I2S</strong></li>
<li><strong>Up to 4 × PWM channels</strong></li>
<li><strong>Up to 3 × GPCLK outputs</strong></li>
<li><strong>2 × HDMI 2.0 ports (supports up to 4Kp60 on both ports
simultaneously)</strong></li>
<li><strong>2 × 4-lane MIPI ports supporting both DSI (display port) and
CSI-2 (camera port)</strong></li>
</ul></li>
<li><strong>Video Support:</strong> H.265 (4Kp60 decode), OpenGL ES 3.1
graphics, Vulkan 1.2</li>
<li><strong>Power:</strong> 5V (up to 5A with USB-C PD)</li>
</ul>



<br>
<!-- Footer -->
</div>

<br>
<div align="center"><hr>
  <a href="../"><img alt="Blog" src="https://img.shields.io/badge/-Developer%20Blog-DD4814?style=flat-square&logo=github&logoColor=black"></a> 
  <a href="https://github.com/dntstck"><img alt="GitHub" src="https://img.shields.io/badge/-@dntstck-181717?style=flat-square&logo=GitHub&logoColor=white"></a> 
  <a href="https://www.linkedin.com/in/drudelarosa"><img alt="LinkedIn" src="https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=Linkedin&logoColor=white"></a> 
  <a href="https://orcid.org/0009-0003-6755-7655"><img alt="ORCID" src="https://img.shields.io/badge/-ORCID-A6CE39?style=flat-square&logo=ORCID&logoColor=white"></a> 
  <a href="https://stackoverflow.com/users/28874348/dru-delarosa"><img alt="Stack Overflow" src="https://img.shields.io/badge/-Stack%20Overflow-FE7A16?style=flat-square&logo=Stack-Overflow&logoColor=white"></a>
</div>
