<!-- Header -->
<link rel="stylesheet" href="../../assets/css/style.css"/>
<div align="center">    
  <a href="../"><img alt="Dev Blog" src="https://img.shields.io/badge/-Developer%20Blog-FE7A16?&logo=git&logoColor=white"></a><br><br></div> 

<div align="center"><a href="../"><img alt="Home" src="https://img.shields.io/badge/-Home-151515?&logo=Arduino&logoColor=C51A4A"></a> <a href="../development"><img alt="Pi" src="https://img.shields.io/badge/-Development-151515?&logo=git&logoColor=C51A4A"></a> <a href="../picosystem"><img alt="PicoSystem" src="https://img.shields.io/badge/-PicoSystem-151515?&logo=raspberrypi&logoColor=C51A4A"></a> <a href="../devserver"><img alt="Dev Server" src="https://img.shields.io/badge/-Dev%20Server-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="../rust"><img alt="Rust" src="https://img.shields.io/badge/-Rust-151515?&logo=rust&logoColor=C51A4A"></a> <a href="../gamedev"><img alt="Game Development" src="https://img.shields.io/badge/-Game%20Development-151515?&logo=steam&logoColor=C51A4A"></a> <a href="../misc"><img alt="Misc" src="https://img.shields.io/badge/-Misc-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="../raspberrypi"><img alt="Pi" src="https://img.shields.io/badge/-Raspberry%20Pi-151515?&logo=Raspberry-Pi&logoColor=C51A4A"></a>
<a href="../microcontrollers"><img alt="Microcontrollers" src="https://img.shields.io/badge/-Microcontrollers-151515?&logo=Arduino&logoColor=FE7A16"></a>
<a href="../embedded"><img alt="Embedded" src="https://img.shields.io/badge/-Embedded-151515?&logo=C&logoColor=8a3f8f"></a>
<a href="../webdev"><img alt="Web Dev" src="https://img.shields.io/badge/-Web%20Development-151515?&logo=html5&logoColor=DD4814"></a></div>
<hr>
<div id="blog-post">
<!-- Main --> 




<h1 id="Automating"><em>Dev Server Automation</em></h1>

<p>hi all, tis been a while. recently i've been furthering my rust knowledge and developing a vim plugin for rust crate management, Virgo. you can check it out <a href="https://github.com/dntstck/virgo">here</a>. this project has taken up a lot of my time and alas, i have neglected my blog. so today its time to end that neglect and dive in to what i have been working on over the last week and that is using the power of my Compute Module 5 Dev Server to optimize said project.</p>


<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver.jpeg" alt="CM5 Dev Server" />
<br><sup>My CM5 Dev Server, housed in a generic abs enclosure.</sup>
</figure>

<h1 id="Automating"><em>Compute Module 5</em></h1>
<p>the subject in question. this is a 4gb cm5 hooked up to the official io board with a 2280 128gb nvme drive which is connected to my local network over ethernet. it's on 24/7, tinkering away, mostly backing up data and hosting my local git server but it also has the power to automate builds and after realizing a rookie mistake (more later) i decided to automate the now lengthy build process with bash, cron and email notifications using smtp.</p>


<h1 id="Automating"><em>Rookie error</em></h1>
<p>we all make them. mine was the sudden realization i was only building and releasing for x86_64, lol. duh. other architectures are available.
so this now required building openssl from source for each architecture.. after a few hours of trying to get rustc and linux to play ball, finally by actively selecting each compiler in the shell (CC=) before the compilation of each architecure, we was ready to go.</p>


<h1 id="Automating"><em>Bash</em></h1>
<p>now i needed to create an automation script that looped over 3 different architectures, x86_64, aarch64 and armv7 as these are the most common for linux. this was easy enough but then i had the absolutely genius idea of using the mail command to send a build report when it was complete. horror ensued.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver-cc-bash.png" alt="cross compile bash script" />
<br><sup>snippet of my cross compile script</sup>
</figure>

<h1 id="Automating"><em>smtp hell</em></h1>
<p>i had a horrible time configuring smtp. the end issue was using an icloud account that was linked to gmail. for some reason googles smtp server did not like it. it took a few hours and several failed attempts before i started from scratch and generated a new google account in order for it to work however it was finally fully configured, emails sent after each build or even each fail, with the subject of the email denoting build status and also some fun but important stats such as build time, temp and cpu load in the email body.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver-nightly2-bash.png" alt="nightly build script" />
<br><sup>nightly build script, with mail command and system stats</sup>
</figure>

<h1 id="Automating"><em>cron job</em></h1>
<p>the final hurdle! i love finally putting a script into cron, makes it feel finished. simple usage of crontab -e and the usual syntax means i now have builds for virgo over three architectures running every night at 2:00am, after a build a report is generated into a log file, attached to the email and sent. while i was here, i whipped up a few more scripts that run at different times, linting with clippys pedantic mode happens at 2:30, tests are run at 2:45:am and an overall system health report of the cm5 happens at 3am. all results are sent to me instantly via email, making my life a lot easier.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver-nightly2-bash.png" alt="nightly build script" />
<br><sup>crontab, with scripts executing at 2, 230, 245 and 3am respectively</sup>
</figure>

<h1 id="Automating"><em>final thoughts</em></h1>
<p>automation is king in the current, vast and high paced world of development. having builds, linting and tests run while you sleep is a game changer and this is just the start of it. we could have scripts execute on a commit using hooks with our local git server, run automated analysis on project changes, lifecycle, code quality or errors, utilize docker and kubernetes with bash and cron to automate containerized builds in a dedicated environment... the options are endless. plus, bash scripting is fun and an extremely useful skill in your toolkit, so automation also makes for good practice.

until next time, <br>
Dru x</p>





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
