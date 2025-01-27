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




<h1 id="picosystem-peek"><em>PicoSystem Peek</em></h1>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-front.jpeg" alt="PicoSystem Front" />
</figure>
<p>My beautiful partner very much suprised me with Pimoroni's PicoSystem at Christmas, so I have been lucky enough to get my hands on one.
Although, admittedly I have had absolutely no time to get down to grips with it, but I have been picking it up and playing with it when I have 
a spare five minutes. Currently have Gatekeeper loaded on it, which is a 3rd party RPG reminscent of Pokemon, but without the Pokemon! 
It's a pretty neat little RPG and considering what it runs on, and the device itself, it's very impressive. I have high hopes for this device
and a lot of ideas. Now, the PicoSystem retails for around 50 British Sterling and is well worth every penny not from just judging at the specs, 
but the build quality and the case is a heaven to hold, it's sleek and has a great weight and leaves you in the solace that if you do drop it,
nothing will break.</p>
<h2 id="closer-look"><em>A Closer Look</em></h2>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-angle.jpeg" alt="PicoSystem Angle" />
</figure>
<p>On closer inspection, we can see the typical arrow keys, and button layout similar to a Nintendo. It feels great to hold and don't let the small
size fool you, it's very comfortable and very much playable. I stil can't get over the balance of this thing, the weight is so comforting and I can
see it still being a comfortable weight after an hours play. Beautifully set USB-C slot positioned on the top and a power button, again, you really 
get what you pay for in terms of build quality. Powering on the device and holding "X" will boot it into flash mode, for flashing games via Drag n' Drop. 
Really nifty. The PicoSystem also boasts a little piezo speaker, for all the retro bleeps and bloops your heart can desire.</p>

<h2 id="specs"><em>Specs</em></h2>
<p> <em><b>Processor:</b></em> Dual Arm Cortex M0+ running at up to 133 MHz with 264 kB of SRAM.<br>
<em><b>Memory</b></em> 16 MB of QSPI flash supporting XiP.<br>
<em><b>Display:</b></em> 1.54" color SPI IPS LCD (240 x 240 pixels).<br>
<em><b>Controls:</b></em> D-pad and four face buttons.<br>
<em><b>Battery:</b></em> 525 mAh LiPo battery (6 hours+ of playtime).<br>
<em><b>Audio:</b></em> Piezo speaker.<br>
<em><b>Power:</b></em> On/off power button, programmable and rechargeable via USB-C.<br>
<em><b>Case:</b></em> CNC milled aluminum with a wrist strap.<br>
<em><b>Programming:</b></em> Supports C++, MicroPython, and CircuitPython.<br>
</p>

<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-back.jpeg" alt="PicoSystem Back" />
</figure>

<h3 id="32blitsdk"><em>32blit SDK & MicroPython</em></h3>
<p>The PicoSystem also boasts the ability to not just be programmable in MicroPython (and CircuitPython), but C++ too with the aid of the 32blit SDK. I have not delved
too far into this subject as of yet due to time constraints, such as working on completing my Cloud Web Development course, managing this blog and 
other projects but I hope to get round to it soon and writing some more on the subject!</p>

<h4 id="doom"><em>Does it run DOOM?</em></h4>
<p>Yes, I think so. There is a RP2040 port for DOOM that I think I can get working with the PicoSystem, hopefully more on that in the future.</p>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-edge.jpeg" alt="PicoSystem Edge" />
</figure>

<h2 id="final-thoughts"><em>Final Thoughts</em></h2>
<p>If you enjoy game development, love Raspberry Pi, want something cool to game on or are interested in the future and capabilities of this device,
I strongly implore you to get one! Just such a beautiful little device to hold in your hands and is great for quickly picking up, playing a quick
game or two, then powering off and putting away again for the next time. For those interested in programming and development the world is your oyster when
it comes down to the power of this system and the diverse capabilities of the 32blit SDK... buy one!</p>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-pxl.png" alt="PicoSystem Pixel Art" />
</figure>
<p>Did I mention the weight of it?</p>



<p>- Dru </p>


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
