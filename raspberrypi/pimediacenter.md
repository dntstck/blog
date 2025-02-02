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





<h1 id="mediacenter"><em>Building a Pi Media Center</em></h1>

<p>My partner and I have finally decided to ditch traditional cable/satellite services, our TV already has Netflix built in along with a range of others such as ITVX and Freeview, meaning we have a whole host of things to watch at our disposal even if we don't wish to fork out 120 moneys a year for Netflix. Furthermore, I firmly believe I can build something much better, that's more reliable, extendable and content rich while remaining relatively inexpensive. </p>

<p>The solution is a media center &amp; NAS, that works over our network and can stream content such as video, audio or even large files across our network, internally and securely. I have actually been considering this for a while now and just in case it came to fruition, I bought a spare carrier board for a CM4/CM5 module if the situation ever arose and it seems like this is it's moment.</p>

<h1 id="whymedia""><em>Why a Media Center?</em></h1>
<p>The main reason is the price. Sure, the convenience is there, but functions such as play/pause and record are irrelevant with a media center as the files are hosted locally. We rarely watch live TV anyways, except for background noise which is a habit we can soon budge out of by streaming music instead. Sky sets us back over 400 moneys per year and I think I can build a decent media center for around 200 moneys. Saving 200 moneys in the first year and 400 thereafter.. Even with netflix it's still a massive saving, it's also fully upgradable and will always flow with current technologies.</p>

<h1 id="choosingpi"><em>Choosing Pi</em></h1>

<p>Pi, will be useful as ever here. Compute Module would be perfect for the main media center and as the NAS. The power of the CM4 will be plenty, I did consider using a CM5 but considering the current price of them on eBay compared to the CM4, and the price of the CM5 on the PiHut (plus 20% tax and delivery charge) I opted for the less currently desirable CM4 which is (sure, less powerful than the beast of the CM5 which I use in my DevServer, but) still more than adequate for our current needs. Don't forget either, the CM4 &amp; CM5 are drop in replacements for each other and the board I am using works with the CM5 too, I've tested it and can confirm the CM5 is <b>fully compatible</b> with the <b>Waveshare CM4 Mini Baseboard C.</b><br></p>

<p>This setup will also be fully upgradable too, with a spare CM4 module going if I do upgrade, I can build another module to stream files from (or to, as backup), or a dedicated mini games center, another devserver... I could even buy a dedicated HAT and train AI with it. The possibilities are absolutely endless.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/misc-cm4.png" alt="CM4 Module" />
<br><sup>The CM4 Module will be perfect for our purposes.</sup>
</figure>

<h1 id="shopping"><em>Inventory</em></h1>

<p><h3>Equipment I will need:</h3></p>

<p><b>CM4 Module</b> <sup>(4GB+ RAM)</sup><br>Media Center/NAS</p>

<p><b>Pi4</b> <sup>(4GB+ RAM)</sup><br>Streaming Module 1</p>

<p><b>1TB+ USB Hard Drive</b> <sup>(file storage)</sup><br>For CM4</p>

<p><b>Ethernet Cables</b> <sup>(0.5m, 1m, 5m, 10m)</sup><br>Smaller cables to connect devices to the switch and to the LAN, longer cables for Media Center connections</p>

<p><b>SD Card</b> <sup>(for the Pi4)</sup><br>Stores the Base OS for Streaming Module 1</p>

<p><b>Enclosures</b> <sup>(cases for the CM4 and Pi4)</sup><br>Prevents Dust and ESD</p>

<p><h3>Equipment I own:</h3></p>

<p><b>CM4 Carrier Board</b> <sup>(Waveshare CM4 Mini Baseboard C)</sup></p>

<p><b>Network Switch</b> <sup>(4 Port)</sup><br>8 port would have been preferable, but this switch is low power and 1Gbps over 100/1000Mps</p>
<p><b>PoE Injector</b><br>
2 Port Injector that I think I can use to power the Pi4 for now.</p>

<h1 id="bargain"><em>Nailing a Bargain</em></h1>

<h3><em>Main Modules</em></h3>

<p>Upon my quest to the land of Bay, I discovered a Pi4 with PoE HAT for sale. An absolute steal at 43 moneys considered the HAT itself goes for around 35. That went straight in the basket. I wasn't holding out much hope for a good CM4 module, but surprise befelled me when I stumbled on a CM4 module with 16gb of eMMC and 8GB RAM for 50 moneys. Now, this was good. Okay, 16gb of eMMc wasn't but that was immaterial as the carrier board has a 128gb nVME installed on it. It's RAM I need and at 8GB for 50 moneys I wasn't saying no. Basket for you. That's the modules sorted at 93 moneys, I quickly bought these before someone else did and then got back to shopping.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/pi4-poe.png" alt="Pi4 &amp; PoE" />
<br><sup>Pi4 with PoE (Power over Ethernet) support.</sup>
</figure>

<h3><em>Hardware</em></h3>
<p>Ethernet Cables were next on the list and I grabbed those in lengths of 25cm, 50cm, 1m, 5m and 10m, sufficient to connect everything to the main network switch in the living room, and our bedrooms connected. Hard Drives next, I want something that's budget and satisfactory for now and settled on an unbranded external 2TB USB hard drive at 18 moneys. Hard drives will be the next upgrade for the Media Center, so we can sacrifice this with a more budget friendly option for now in order to get the system up and running. The Pi4 required a SDCard for the operating system, so an SDCard of 32GB at 6 moneys was added to the basket, a Micro HDMI cable is also required here as the Pi4 does not support a full HDMI port, 3 moneys. Total hardware cost of 27 moneys</p>

<h3><em>Enclosures</em></h3>

<p>Enclosures are going to be important here, with the areas these modules being stored are high traffic areas and prone to dust. Pi4 will be easy to find a case for, but the Waveshare CM4 Mini Baseboard C is not. Project boxes are inexpensive and are great for the Compute Modules as I have previously discovered when building one for my CM5 DevServer. A 100x68mm box was added to the basket for 8 moneys, and a custom orange (fancied a change from black) Pi4 case at 4 moneys. That's the enclosures sorted at 12 moneys.</p>

<h1><em>Quest Complete, +12 RAM</em></h1>

<p>Shopping for a Module, Pi4 and everything else we needed turned out fruitful. This was definitely a right place, right time moment with the Pi4 4GB RAM + PoE HAT &amp; CM4 8GB RAM at such a great price, way more ram than I bargained for and the PoE HAT is a nice addition, especially for later down the line when I upgrade our current switch to PoE. Although, I do own a tiny 2 port POE Injector, so maybe I can incorporate this somehow as it would save me having to find a USB cable and dedicate a USB plug to it. I have plenty of cables and a few spare plugs, but would like to keep the plugs spare so using PoE in this fashion is an option, I grabbed plenty of ethernet cables in my order, also.</p>

<figure>
<img src="{{ site.baseurl }}/raspberrypi/img/misc-cm4ebay.png" alt="CM4" />
<br><sup>CM4 Modules on eBay</sup>
</figure>

<br>
<p>The RAM is honestly great, and it opens up a whole host more of possibilities with not just the media center, but the Pi4 Streaming Module too. I have already eyed some replica NES and SNES USB controllers, just find to find a PSX one as a retro games center is definitely on the cards. I feel that 8GB of RAM not only allows us to explore PSX, but (legal) PS2 emulation too. At a total cost of 138 moneys, including delivery we haven't done half bad. </p><br>

<p>The media center itself can also be extended with a simple generic USB DVD/RW drive connected to the CM4 Module. Watching DVDs (<sup>extremely cheap to buy at all secondhand stores</sup>), as well as ripping them for use on the NAS would be completely viable. There are definite upgrades here, such a better external hard drives, SSDs or nVME drives. While not an upgrade for the media center itself, a larger ethernet switch is on the cards, especially one that is PoE enabled.</p>

<p>Well, that's it for tonight. Simply have to wait for it all to arrive and then assemble it.</p>
<p>Catch you next time, <br> Dru </b>


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
