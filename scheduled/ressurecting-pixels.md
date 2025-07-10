---
title: "resurrecting-pixels"
date: 2025-07-10T00:41:41Z
publishDate: 2025-07-10T00:00:00Z
tags: [embedded]
---

<h1 id="resurrecting-pixels"><em>resurrecting pixels, through grit, glory and GRAM.</em></h1>

<p>while digging through my boxes of electronics, i stumbled upon an old motherboard from a mini pc. i had little hope when plugging it in but lo and behold, she booted! into freebsd 64 bit. i knew exactly what it was too when i saw the red logo. its an old Metin2 private server.</p>


<figure>
<img src="{{ site.baseurl }}/embedded/img/embedded-miniboard.jpeg" alt="mini motherboard" />
<br><sup>Mini motherboard, AK1N335</sup>
</figure>


<h1 id="ressurecting-pixels"><em>caseless</em></h1>
<p>the motherboard itself was bare, no case, nothing. so i fashioned one from an old piece of baton and a sheet of acrylic from an old photoframe.</p>

<figure>
<img src="{{ site.baseurl }}/embedded/img/embedded-diycase.jpeg" alt="building a diy case" />
<br><sup>DIY case in progress</sup>
</figure>

<h1 id="ressurecting-pixels"><em></em>ideas go bing</h1>
<p>obviously i wanted to get the freebsd server running, and metin2 itself. i have a large collection of many revisions of its source code, so anything is possible. but my adhd brain had a fantastic idea, because its headless I can utilise my pico 1.8 lcd and rp2040plus, to show data from the server right?</p>

<figure>
<img src="{{ site.baseurl }}/embedded/img/embedded-casefinished.jpeg" alt="the finished case" />
<br><sup>DIY case with pico 1.8 lcd and rp2040plus</sup>
</figure>

<h1 id="ressurecting-pixels"><em>wrong</em></h1>
<p>i tried rust. i tried absolutely everything, i was going through linker hell. any uf2 produced was corrupted, then i finally got some non corrupted uf2s... with no entry point! even using no mangle, i had no luck and was facing wall after wall.</p>


<h1 id="ressurecting-pixels"><em>different angle</em></h1>
<p>so i decided a new angle. i tried circuitpython just to test for hardware faults. it worked instantly, so the hardware wasnt to blame. then i used circuitpythons init sequence and rewrote the entire driver in C.</p>


<h1 id="ressurecting-pixels"><em>the entire driver?!</em></h1>
<p>yup, had to. the waveshare ones i found werent working at all, i was looking at white screens for 3 days and getting nowhere. i may be a rust dev, but i have a background in C and im happy to switch languages to adapt if needs be.</p>


<h1 id="ressurecting-pixels"><em>did it work?</em></h1>
<p>you betcha. it did! i FINALLY had something on the screen that wasnt white. it was garbled, but it was output! after days of mangling, it felt great.</p>

<figure>
<img src="{{ site.baseurl }}/embedded/img/embedded-lcd-garbled.jpeg" alt="output from the lcd" />
<br><sup>finally, something that isnt a white screen!</sup>
</figure>

<h1 id="ressurecting-pixels"><em>the heart wants what it fonts</em></h1>
<p>it was finally time to try text output. all tests worked, the screen was now filling with colour. i had to find a font map and adapt it, then i had to debug because my map started at 33, not 32. it was causing garbled output, hello was ifmmp, for example. after fixing the error, hello word finally appeared! success.</p>

<h1 id="ressurecting-pixels"><em>side quest/main quest</em></h1>
<p>this was a serious side quest that ended up becoming a main quest, but i finally had it. everything is ready now for the next stage which is writing some form of server for the freebsd machine which will collect and send data via usb to the rp2040. in next post, we wire dreams to bytes.<br> laters! dru xo</p>

