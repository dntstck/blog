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
<img src="{{ site.baseurl }}/picosystem/img/picosystem-boxfront.jpeg" alt="PicoSystem Front" />
<br><sup>Boxed PicoSystem</sup>
</figure>
<p>My beautiful partner very much suprised me with Pimoroni's PicoSystem at Christmas, so I have been lucky enough to get my hands on one.
Although, admittedly I have had absolutely no time to get down to grips with it, but I have been picking it up and playing with it when I have 
a spare five minutes. Currently have Gatekeeper loaded on it, which is a 3rd party RPG reminscent of Pokemon, but without the Pokemon! 
It's a pretty neat little RPG and considering what it runs on, and the device itself, it's very impressive. I have high hopes for this device
and a lot of ideas.</p>

<h2 id="closer-look"><em>Unboxing &amp; a closer look</em></h2>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-boxback.jpeg" alt="PicoSystem Box Back" />
<br><sup>Box Details</sup>
</figure>

<p>A quick look at the box shows a well thought out design, with all the info you need on the box itself. Looking at the back we can see the brains of this outfit being Raspberry Pi's RP2040 chip, the same that powers most (but not the newest) Pi devices.<br>
It has dual cores of 133MHz, which is sufficent for 2D based games, handling game logic and frame rendering with ease. Even more so, as this is overclocked to 250MHz! Supporting PIO (Programmable IOs) and Direct Memory Access which can help offload tasks from the CPU, 
allowing more efficient processing.<br>
It also boasts 264kb of SRAM and for a little device that's primarily 2D focused (but 3D is definitely possible), it's plenty. 264kb will hold all state variables, game logic and even small graphical assets with ease.<br>
16MB of QSPI flash supporting XiP is a nice touch also. 16mb is more than plenty for holding sprites, levels, small game assets, etc on the PicoSystem, with XiP (eXecute In Place) allowing the code to run directly from the flash memory, freeing up SRAM for other tasks.<br>
The dinky 1.5" LCD display is super bright and clear, every pixel is visible. Just perfect especially for games that have that retro touch. Nice in low light and viewable from every angle thanks to IPS technology. <br>
The battery is a 525mAh LiPo, rechargeable via USB-C (another nice touch.) and boasts 6+ hours of playtime. I've been playing mine on and off since Christmas and I am yet to charge it! <br>
While it's not massively powerful and is no home hi-fi system, the piezo speaker is definitely sufficient for the games you would create on it. Who doesn't love a bit of chiptune bleep-bloop? The only downside with this is theres no volume, or mute button to disable the sound would be a nice addition, as not everyone around you wants to hear it.<br>
Honestly the USB-C is a dream, all devices should be USB-C. It irks me that the Pico, Pico2 and Pico2W are still microUSB. Even the Tiny2350 has USB-C! Anyways, tangent, the power off button doubles as a mass storage device toggle, so plug it in, hold X and power it on to access the PicoSystem from your PC as a USB Storage Device. The LED on the front is programmable, meaning you could use it in your games to indicate low health, low battery, etc.<br>
Honestly apart from the device itself and the powerhouse it is, the CNC milled aluminum case is the next best thing about this. The weight is heavenly! It feels such a dream to hold. My Nintendo Switch is very "clunky" in comparison. Its sleek, smooth and feels good in your hands. The Directional Pad and ABXY buttons have a lovely feel to them also. I can't get over the weight and balance of this thing, it's great!<br>
Now I wasn't aware of this until I googled it just now, but the PicoSystem also supports SWD Debugging, I'll have to open mine up and have a look. I'll post some specs here; then we will carry on with unboxing.<br>

<h2 id="specs"><em>Specs</em></h2>
<p> <em><b>Processor:</b></em> Dual Arm Cortex M0+ running at up to 133 MHz (overclocked to 250MHz) with 264 kB of SRAM.<br>
<em><b>Memory</b></em> 16 MB of QSPI flash supporting XiP.<br>
<em><b>Display:</b></em> 1.54" color SPI IPS LCD (240 x 240 pixels).<br>
<em><b>Controls:</b></em> D-pad and four face buttons.<br>
<em><b>Battery:</b></em> 525 mAh LiPo battery (6 hours+ of playtime).<br>
<em><b>Audio:</b></em> Piezo speaker.<br>
<em><b>Power:</b></em> On/off power button, programmable and rechargeable via USB-C.<br>
<em><b>Case:</b></em> CNC milled aluminum with a wrist strap.<br>
<em><b>Programming:</b></em> Supports C++, MicroPython, and CircuitPython.<br>

<h2 id="unboxing"><em>Unboxing</em></h2><br>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-boxopen.jpeg" alt="PicoSystem Box Opened" />
<br><sup>PicoSystem Unboxing</sup>
</figure>

Looks great so far. I love all the details on the box. It has everything written where you need it. Let's open her up fully..

<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-unboxed.jpeg" alt="PicoSystem Unboxed" />
<br><sup>PicoSystem Unboxed</sup>
</figure>

Here we go, fully unboxed. Again, love all the details. It says there's a lanyard hidden inside which is useful as I'd want it secured around my wrist anyways as I'm a bit of a klutz! Looks great, really nice. Super sleek and so smol!

I'm very interested after googling and seeing that it supports SWD debugging (it apparently has some other pinouts too), 
so let's put an ESD bracelet on and take a peek.

<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-backview.jpeg" alt="PicoSystem Back View" />
<br><sup>Back view of the PicoSystem</sup>
</figure>

Now, this is new. Allen keys instead of a phillips. Luckily I have some tiny hex keys so let's pop her open.

<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-opencircuit.jpeg" alt="PicoSystem Open with Circuitry" />
<br><sup>PicoSystem Unboxed</sup>
</figure>

<p> Yup, there it is. an SWD pin, I spy a 3v pin too as well as some others I'm not familiar with. Cool. So it fully supports Serial Wire Debugging. It's also neat to see the inside of the device too but be warned as I found out, the power button will just fall out so make sure you open it somewhere where it won't fall out and roll off never to be seen again! Looks great inside too, can see the LiPo battery right there powering the powerhouse of the device, the RP2040 right at it's core denoted by the Pi Logo <img src="https://img.shields.io/badge/%20-151515?logo=raspberrypi" alt="Pi Logo"/>

<h2 id="closerlook"><em>Closer look</em></h2><br>
</p>
<p>Now we have opened the PicoSystem, found the SWD pin and had a good look inside, we can put it back together and have a deeper inspection, we can see the typical arrow keys, and button layout similar to a Nintendo. It feels great to hold and don't let the small
size fool you, it's very comfortable and very much playable. I stil can't get over the balance of this thing, the weight is so comforting and I can
see it still being a comfortable weight after an hours play. Beautifully set USB-C slot positioned on the top and a power button, again, you really 
get what you pay for in terms of build quality. Powering on the device and holding "X" will boot it into flash mode, for flashing games via Drag n' Drop. 
Really nifty.</p>

<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-back.jpeg" alt="PicoSystem Back" />
</figure>

<h3 id="32blitsdk"><em>32blit SDK & MicroPython</em></h3>
<p>The PicoSystem also boasts the ability to not just be programmable in MicroPython (and CircuitPython), but C++ too with the aid of the 32blit SDK. I have not delved
too far into this subject as of yet due to time constraints and I didn't want this to be a tutorial as I have plans to explore that in a seperate blog post, but for now please take a look at the <a href="https://github.com/32blitsdk/32blitsdk">32blit SDK</a> to sate your desire for knowledge.</p>

<h4 id="doom"><em>Does it run DOOM?</em></h4>
<p>Yes, I think so. There is a RP2040 port for DOOM that I think I can get working with the PicoSystem, I will definitely be covering this in future blog posts so stay tuned.</p>

<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-edge.jpeg" alt="PicoSystem Edge" />
</figure>

<h2 id="final-thoughts"><em>Final Thoughts</em></h2>

<p>What it isn't: A Nintendo Switch clone with lots of games available<p>
<p>What it is: A tiny, hackable games console that requires some programming knowledge<p>

<p>If you enjoy game development, love Raspberry Pi, want something cool to develop games with or are interested in the future and capabilities of this device,
I strongly implore you to get one! Just such a beautiful little device to hold in your hands and is great for quickly picking up, playing a quick
game or two, then powering off and putting away again for the next time. For those interested in programming and development the world is your oyster when
it comes down to the power of this system and the diverse capabilities of the 32blit SDK... buy one!</p>
<figure>
<img src="{{ site.baseurl }}/picosystem/img/picosystem-pxl.png" alt="PicoSystem Pixel Art" />
</figure>
<p>...Did I mention the weight of it?</p>



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
