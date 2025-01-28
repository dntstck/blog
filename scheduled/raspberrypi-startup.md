---
title: "RaspberryPi StartUp - Choosing Your First Pi"
date: 2025-01-27T16:49:16Z
publishDate: 2025-02-03T00:00:00Z
tags: [raspberrypi]
---

<h1 id="raspberrypi-startup"><em>Raspberry Pi: StartUp </em></h1>

<h1 id="startup"><em>Introducing StartUp</em></h1>
<p>I'd like to introduce a series of blog posts named StartUp that are either tutorials,guides, or simply explanations and possible encounters you may face, covering a broad range of topics, of which today includes a brief explanation of what the Pi is, the differences between Pi's and then choosing your first Raspberry Pi.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-pifamily.png" alt="Raspberry Pi" />
<br><sup>The humble SBC family of Raspberry Pi's</sup>
</figure>

<h1 id="newdevice"><em>Your New Device</em></h1>
<p>So you've found yourself stumbling into the world of Pi, welcome fellow Pidawan to this wonderful little world of micro-computing, which has gained popularity exponentially over the past decade.</p>

<p>The Raspberry Pi is a single board computer (SBC) which is essentially a replica of a desktop computer, in micro format. SBCs use low power, are energy efficient and have a wide range of applications from education, hobbyist, to industry. SBCs have all the needed components on a single circuit board, however while not a complete replacement for a desktop computer (but that entirely depends on how you use a computer), nor a gaming machine, these little guys do pack a serious punch especially in the later modules such as the RaspberryPi 5. Before we go any further, I'd like to cover a topic that I've found most novices get confused with:
</p>

<h1 id="pi500"><em>Pi5, Pi400/500, Zero, Compute Module or Pico?</em></h1>

<p>I've seen plenty of posts in such a short amount of time that most novices get befuddled over and it's a fair thing to get confused about. What is the difference between the Pi4/Pi5, Zero, Pi400/500, Compute Module 4/5 and the Pico<sup>/W</sup>/Pico2<sup>/W</sup>?</p>

<p><b>Raspberry Pi <sup>A/B/3/4/5</sup></b><br>
Single Board Computer, usable as a desktop PC and has accessible prefitted GPIO (more on this later) pins for hacking (Hacking just means tinkering with objects. Not cracking passwords, or other nefarious actions.) Recommended for general users and beginners who want to try the Pi, but still want to dabble in the electronics/hacking side of things if they choose to. The Pi5 is the newest and most powerful version of the SBC, with the Pi4 coming in next. The A and B models are reworked versions of the earliest models.
</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-b.png" alt="Raspberry Pi" />
<br><sup>The humble SBC, Raspberry Pi B</sup>
</figure>

<p><b>Raspberry Pi <sup>400/500</sup></b><br>
Complete desktop kit, with a Pi5 built into the keyboard. Also acceptable for general users and novices to start out with, because it means you just need a HDMI screen to connect to and you have a full blown computer. If you want to watch youtube, play videos at 4k, tinker with programming, write emails and just use the Pi as a general desktop PC then the Pi500 is a good fit for you. There's even a cable you can buy to access the GPIO pins, so you can also tinker with it if you ever decide you want to delve into electronics with a breadboard.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-500.png" alt="Raspberry Pi" />
<br><sup>Pi500, Complete Desktop Kit</sup>
</figure>

<p><b>Zero <sup>W/2W</sup></b><br>
Another single Board Computer, but a much, much smaller form factor (small form factor = it's smol) than the Pi4/Pi5. Aimed at general users. Not as powerful with only 1GHZ single core processor and 512mb RAM, but great for smaller applications where the normal Pi is simply too large. I run a Zero2W as a headless webserver at home. Zero's are usually used in setting up PiHole, which prevents network level adverts from reaching your screen. I've not set one up yet, but plan to do so in the future.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-zero.png" alt="Raspberry Pi" />
<br><sup>Small form factor of the Zero2</sup>
</figure>

<p><b>Compute Module<sup>4/5</sup></b><br>
Not a Single Board Computer, but a System On Module or SOM for short. These are Raspberry Pi's packed into the size of a credit card. Usually used in embedded or industrial applications. An example of their usage would be in a 3D Printer, or even on the ISS. These modules have no accesible ports, so require a carrier board in order to access USB, HDMI, Ethernet, etc. While more aimed at developers and industrial purposes, there is absolutely nothing stopping you from using one just like a Pi5. However they are pricey, difficult to find, require a carrier board which can also be expensive and also need a case, of which there aren't really many on the market and are also quite hard to find. I resorted to building my own in the end. Regarding price, the CM5 will set you back around 50 moneys. This goes all the way up to nearly 90 if you want 16gb of ram and not including a carrier board which can range from 20-50 moneys, that is some serious moneys. Not including a case!
Plus, they are difficult to use, set up and you need a fair knowledge of how these systems operate in order to use one effectively. I do not recommend them for beginners, but if you have the money, learn fast and think you'll enjoy it don't let me stop you. The PiHut does sell a CM5 DevKit, which includes the CM5, a carrier board, case and cables for 120 moneys, considering the price of a Pi5 though (55 moneys), it's almost double.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-cm5.png" alt="Raspberry Pi" />
<br><sup>The beast of a SOM, the CM5</sup>
</figure>

<p><b>Pico/Pico2<sup>W</sup></b><br>
Picos are entirely different to what we've discussed so far, these are Microcontrollers/Development Boards. They are used in electronics and require programming knowledge in order to use. They have no Operating System (Windows, Linux etc) and run purely off the code you write and then flash (installing software permanently on storage) to the memory. They are not recommended for beginners (unless that sort of thing interests you of course), require a bit of setting up and you need a machine already in order to use one. There is no screen output on the Pico either, so you need knowledge with the shell and debugging in order to read any output it produces. There is a LOT I could cover on this subject, but I will not delve in too deep here. I have a whole section on my blog regarding Microcontrollers where I cover the Pico, Pico2W, RP2040plus, Tiny2350 and 2040Zero so feel free to check it out.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-pico.png" alt="Raspberry Pi" />
<br><sup>Pico, a microcontroller.</sup>
</figure>

<p><b>Regarding Games</b><br>
Just be aware that none of these, even the Pi5 or Pi500, are suitable for high-end/new games, they simply do not have the power to render new games. They will run Minecraft at medium settings and emulate older console games, but anything past say 2010? Most likely will not run. Don't quote me on this though, I could easily be wrong and there could be games from 2015 that run on them, I'm just taking an educated guess. I can speak from experience that UnrealTournament99 runs very well on a Pi5, so if older games are your thing then you're all set and yes.. they run DOOM.

So I hope that clears that up for you. Now we can decide...
</p>

<h1 id="choosing"><em>What do I choose?</em></h1>
<p>That, young Pidawan is entirely up to you. If you want my advice, go for a Pi4 or Pi5.</p>
<p> If your budget is tight, try the Zero2W. super cheap, not as powerful but sufficient for day to day tasks.</p>
<p>If you're more of a general user that won't do much programming or tinkering, go with the Pi500. It plays HD Youtube videos very well, will multitask just fine and be a breeze for internet browsing.</p>
<p>If you're more starting out in development/programming, you can consider the Pi5. It has GPIO and is essentially the same as the CM5, but is a safe bet as it's pre-built and will come with a case (usually).</p>
<p>If you're a developer or programmer and want to test yourself, get the CM5 DevKit.</p>
<p>If you want to dabble in eletronics, creating robots and the like, then go for a Pi4/Pi5 for developing your code and a Pico2W for running the code (the W just means they have WiFi). The Pico's are super cheap. The Pico goes for around 4 moneys and the Pico2W retails at around 7. so really inexpensive. It's best to use a Pi4/5 for development and debugging because they have specific functionality for doing so, USB debugging is doable with Windows or Ubuntu, but UART and SWD debugging are far superior, you could also set up a second Pico as a dedicated debugger, eliminating the need to a development machine that's Pi and use Windows or Linux to develop.</p>

<h1 id=""><em>Before you buy</em></h1>
<p><b>If you're tinkering with open circuits, buy an ESD bracelet!</b><br>
I can't stress this enough. Electro Static Discharge will fry your devices, even if they are off. If you have carpets, static will be a big issue and one day you may turn on your Pi to be welcomed by a cloud of blue smoke and a funky smell. Pi is dead after that I'm afraid. It's fried. So save yourself some heartache and get an ESD bracelet.</p>
<p>Buying a <b>case</b> is another good bet too, if yours doesn't come with one, it will prevent dust and also eliminate the chance of ESD.</p>

<p>Those who are tinkering with <b>electronics</b> will need dupont wires, a breadboard, some leds and tactile buttons. I'm not massively into breadboarding and circuits myself, but this is a good head start to get you going.</p>

<p><b>SD Card</b> you will need a microSD card in order to flash the operating system to it, so you can install it on your Pi. You can buy these preflashed from the Pi Hut, do it yourself with a spare memory card, or even install over a network if you choose, elimating the new for an SDcard entirely.</p>

<p>You may need a <b>Monitor, Keyboard and Mouse</b>, unless you have the <b>Pi400/500</b>, then you will only need a <b>monitor</b>.

<b>Ethernet Cable</b> if your Pi doesn't support WiFi, you will need an ethernet cable to plug into your router so you can connect to the internet.</p>

<h1 id=""><em>I don't have a spare monitor!</em></h1>
<p>Now, this may not be a problem. If you intend on using the Pi for programming, or as a web server, you can run the Pi without anything connected to it. This is what's known as running "headless". You can simply connect to your Pi over SSH, via your main computer and operate it from there using typed commands. We will cover SSH and running your Pi headless in the next edition of StartUp.
If however, you intend on using the Pi directly, such as for running old games or watching videos, you will need a spare monitor.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/raspberrypi-cm5io.png" alt="Raspberry Pi" />
<br><sup>CM5 hooked up to a carrier board.</sup>
</figure>

<h1 id="ttfn"><em>TTFN</em></h1>
<p>Well, that's it for now! I hope I covered an introduction the Pi well and explained the differences between the Pi, Compute Modules and the Pico and what you should choose depending on your requirements.
As you've ordered your Pi and all the stuff to go with it, all we have to do now is wait. In the next edition we will be covering your first boot, running your Pi headless (if required), explaining Linux, GPIO, SSH and lots lots more!</p>

<p>Catch you next time

- Dru </p>

