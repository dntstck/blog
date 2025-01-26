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




<h1
id="devserverupgrades"><em>DevServer Upgrades</em></h1>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cm5iocase.png" alt="CM5 IO Case" />
</figure>

<p>Out of stock, forever. </p>

<p>That's how it feels waiting for the CM5 IO Case stock to replenish on the pi hut. So I decided to build my own. It can't be that hard, surely? Obviously it wouldn't be a pro finish as I am not a professional case maker, but I can give it a shot.</p>

<h2 id="absjunctionbox"><em>ABS Junction Box</em></h2>
<p>I was searching through eBay when some generic ABS junction box/project box/enclosures popped up. Fairly cheap for what they are and they look quite nice. There's a few sizes and one caught my eye as it would fit the CM5 IO Board, plenty of room too at 200mm long, 75mm high and 100cm wide. I decided to try one, at 7£ it was half the price of the official metal enclosure with alternatively nice looking ABS, looks drillable, comes with a waterproof seal and a screwdriver (I love getting mini screwdrivers with things!)</p>

<h2 id="findingabargain"><em>Finding a bargain</em></h2>
<p>After I had paid for the ABS junction box something else caught my eye, it was an active cooler by WaveShare for the CM4. Most CM4 add-ons are compatible with the CM5 and at 5£ I really couldnt go wrong, it would fit on something. That item went straight through buy it now and all I had to do now was sit back and wait, I was already buying a 128gb 2230 nVME for another project so I thought why not, treat yoself.</p>

<h2 id="equipmentarrival"><em>Equipment Arrival</em></h2>
<p>All arrived safe and sound, but alas. Upon unwrapping the active cooler and inspecting it I noticed it was a 4pin 5v connector which the official RaspberryPi IO board does not have. Gutted. Then a thought occurred, this was not the only carrier board I had for the CM4/CM5, I also had a WaveShare CM4 Mini Baseboard C which infact did have a 4pin 5v connector, so all was not lost as that is going to be used in another project I'm currently working on.</p>

<h3 id="standoffs"><em>Adding standoffs &amp; drilling ports</em></h3>
<p>This was the most nerve-wracking part of the whole saga. Fixing in the standoffs was easy enough. Using a piece of paper I marked out the holes in the IO board and drilling them, attaching with a black m2 bolt and standoff. Drilling the ports however was a another nightmare entirely, having to re-drill the power port countless times. Luckily, I only needed to drill that port out as this system is completely headless and doesn't currently require anything connected to the other ports until I install PoE. Fairly simple at first but the cable seemed to have issues going in fully, plenty of re-drilling and it finally went in all the way and while it didnt end up looking great, it's at the back so it won't be visible.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/absinside.jpeg" alt="Inside the enclosure" />
</figure>

<h4 id="ventilation"><em>Now for ventilation</em></h4>
<p>Ventilation in this is going to be extremely important. The case itself is 200mm long by 100mm wide which sways in our favour, as there is more air mass inside the object to move creating a cooler temp for the CM5 to run, preventing throttling. The dev server will have lots of processess running at once so this is critical. Having the active cooler not fit is a bit of a hurdle, but not as big as a hurdle if I did not have a 5v fan spare.</p>

<p>After drilling the holes and installing the 5v fan, placing it incorrectly and then moving it into the correct position leaving lots of holes in the wrong place, (it's just more ventiilation dont worry) I attached the 5v wire and the GND wire into the correct GPIO pins. This IO board follows the same pinout as the Pi5, so we can use that as a reference.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cm5-fitted.jpeg" alt="CM5 Installed" />
</figure>

<p>I had to attach this fans wires to a female to female dupont wire as there was no other way of connecting it, a gentle tug ensures it's connected properly. I then glued these to the side, positioning them apart from each other to prevent shorting.</p>

<h2 id="firstboot"><em>First Boot</em></h2>

<p>Always a nerve wrecker, this one. Especially as the fan did not start spinning! Panic for a moment, noticed LED activity, quick prod of the power wire and the fan starts spinning at full speed. Phew. Just a loose connection. Even though I always wear my ESD bracelet when working with any open boards I do always worry.</p>

<h2 id="fullspeed"><em>RPM Over 9000</em></h2>

<p>This is one issue we are going to encounter due to the fan we are using is a simple 2 wire 5v fan, it doesn't have a pwm/fan controller wire. No fan controller means the fan will simply run at full power (5v), full speed. Not usually a problem however I think this fan is quite old because it's a tad on the noisy side. I will have to look into getting a different fan for this, but it will suffice for now.</p>

<h1 id="wq"><em>:wq</em></h1>
<figure>
<img src="{{ site.baseurl }}/devserver/img/wqsticker.jpeg" alt="wq Sticker" />
</figure>

<p>I have the perfect sticker for this box. found it while searching for a new Vim sticker for my laptop, a large <code>:wq</code> command</p> sticker that will look neat and be nice nod to Vim. I'd like a Pi Inside sticker on the front eventually also. 

<h4 id="final-thoughts"><em>Final Thoughts</em></h4>
<p>Well that was fun! Bar the stress of drilling the ports and the downer of the active cooler being the wrong connection (my fault for not double checking), this little project turned out quite well and a much better improvement over it's old housing of it's cardboard box that it was shipped in.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/oldcase.jpeg" alt="Old case" />
</figure>

<p> It was heating up and running at unsafe temperatures, now it runs at a lovely 38c even when connected to the DevServer via SSH in VSCode and operating other processes such as Docker, k3s and mariadb.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cm5temp.png" alt="CM5 Temperature" />
</figure>

<p>I will definitely be buying more of these, they look great. Compute modules and carrier boards fit in them nicely, they drill really well and are extremely strong as well as being waterproof with the seal that comes with it. Even after drilling and not sanding they still look acceptable. Good value and great for quick projects to prevent dust and electro static discharge, the worst enemy of all. </p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver.jpeg" alt="Workstation" />
</figure>

<p>Looks great, doesn't it?<br>
<p>Now onto some different projects, next time we will be peeking at Pimoroni's PicoSystem, building a Pi NAS &amp; mediacenter, which luckily, our active cooler will come in use for ( now you know why I was buying a 2230 nVME!) and other cool stuff involving portable dev envrionments, building a homelab server, tweaking my Pi Zero2 and more.</p> 

<figure>
<img src="{{ site.baseurl }}/devserver/img/wq.png" alt="wq pixelart" />
</figure>
<p>
- Dru</p>


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
