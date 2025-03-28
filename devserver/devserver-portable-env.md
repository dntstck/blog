<!-- Header -->
<link rel="stylesheet" href="../../assets/css/style.css"/>
<div align="center">    
  <a href="../"><img alt="Dev Blog" src="https://img.shields.io/badge/-Developer%20Blog-FE7A16?&logo=git&logoColor=white"></a><br><br></div> 

<div align="center"><a href="../"><img alt="Home" src="https://img.shields.io/badge/-Home-151515?&logo=Arduino&logoColor=C51A4A"></a> <a href="./development"><img alt="Development" src="https://img.shields.io/badge/-Development-151515?&logo=git&logoColor=C51A4A"></a> <a href="./picosystem"><img alt="PicoSystem" src="https://img.shields.io/badge/-PicoSystem-151515?&logo=raspberrypi&logoColor=C51A4A"></a> <a href="./devserver"><img alt="Dev Server" src="https://img.shields.io/badge/-Dev%20Server-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="./rust"><img alt="Rust" src="https://img.shields.io/badge/-Rust-151515?&logo=rust&logoColor=C51A4A"></a> <a href="./gamedev"><img alt="Game Development" src="https://img.shields.io/badge/-Game%20Development-151515?&logo=steam&logoColor=C51A4A"></a> <a href="./misc"><img alt="Misc" src="https://img.shields.io/badge/-Misc-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="./raspberrypi"><img alt="Pi" src="https://img.shields.io/badge/-Raspberry%20Pi-151515?&logo=Raspberry-Pi&logoColor=C51A4A"></a>
<a href="./microcontrollers"><img alt="Microcontrollers" src="https://img.shields.io/badge/-Microcontrollers-151515?&logo=Arduino&logoColor=FE7A16"></a>
<a href="./embedded"><img alt="Embedded" src="https://img.shields.io/badge/-Embedded-151515?&logo=C&logoColor=8a3f8f"></a>
<a href="./webdev"><img alt="Web Dev" src="https://img.shields.io/badge/-Web%20Development-151515?&logo=html5&logoColor=DD4814"></a></div>
<hr>
<div id="blog-post">
<!-- Main --> 




<h1 id="devserver-portable-envrionments"><em>Creating portable environments for the CM5 DevServer </em></h1>

<p>Today I'll be going over portable dev environments on my CM5, why I use them and why they are beneficial to every developer, no matter if you're just starting out or fully seasoned.</p>

<h1 id="why-tho"><em>Why, though?</em></h1>
<p>Portable dev environments are incredibly useful and if you're just starting out, be thankful you never endured the pitfalls every developer did 20 years ago, such as machine downtime, version mismatch, operating system incompatability... Nowadays, these issues are rare. Now, we have tools that allow you to create and deploy from pretty much anywhere, on any machine. It doesn't matter if your OS is version 6.7, your colleagues machine is Grape, NodeJS is version 21 on the main project machine but verison 23 on all the other machines.. your project will still work and you can continue to develop and deploy even if these variables change further. The greastest strength is that with portable dev environments, you can run select versions of your project alongside other versions that are completely and totally isolated from each other. If you have a bug in one version, but the other version works perfectly, you can use each version to successfully identify the issue without suffering downtime on the version that has been released.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-cm5.png" alt="CM5 via SSH " />
<br><sup>Connecting to CM5 Dev Server via SSH</sup>
</figure>

<h1 id="VSCode"><em>VSCode</em></h1>
<p>We're going to go off on a tangent here slightly and quickly touch on VSCode, which has been a game changer in the development scene. Next to Vim, it's the most powerful code editor in your toolkit, highly customizable, has a vast range of plugins developed by a dedicated community, easy to use and better yet, allows you to connect and develop remotely via SHH. Tne best thing for me about VSCode is that it supports vim keybidings, so I get the full Vim experience while using VS. Vim is just as powerful and also has a vast array of plugins but harder to get to grips with and set up as an IDE. It's more suited to powerusers than hobbyists or general developers, but developing over SSH is also possible with Vim using an SSH tunnel. I will be covering more on Vim and VSCode in seperate posts in the future, including how to set up Vim as an IDE, so stay tuned for those.</p>

<h1 id="settingup"><em>Setting up &amp; scripting with Bash</em></h1>
<p>Starting up the CM5, which is quite noisy at the minute due to the old fan (you'll be pleased to know I ordered 2 new fans, using the old fan is something I covered <a href="https://dntstck.github.io/blog/devserver/devserver-upgrades">here</a>), I will be going straight to the terminal on my main development machine and I won't have to wait long to connect as the CM5 is lightning fast to boot. </p>

<p>I'll be writing a bash script for this, I write bash scripts for pretty much everything where I can, it's good practice and saves you time in the long run especially for tasks like this, the script can be saved and ported to pretty much any linux machine. This way, you can set up and run a portable dev environment no matter where you are.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash.png" alt="Writing Bash Scripts" />
<br><sup>Starting Vim</sup>
</figure>

<p>So first we open up Vim using the filename we want to create. I place all my scripts in a /script folder in my /dev directory, where all my projects are located. We start our bash script with a Shebang (#!/bin/bash) that tells Bash (the terminal) that this file is a bash script. Now if you have experience with bash commands you will start to notice commands that you recognise and this is all bash scripts are, executable terminal commands with a bit of extra functionality. Feel free to follow along with the pictures, some of the code is missing from the photos but don't fret, I'll post the .sh file at the end of the post.
</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash2.png" alt="Writing Bash Scripts" />
<br><sup>docker function</sup>
</figure>

<p>Here, we write a function to tell the script that this is the code we want to execute when the function is called. This function will execute code that installs docker.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash3.png" alt="Writing Bash Scripts" />
<br><sup>kubernetes function</sup>
</figure>

<p>The next function executes code that installs Kubernetes Lite. (K3s)</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash4.png" alt="Writing Bash Scripts" />
<br><sup>docker_compose function</sup>
</figure>

<p>This function creates a compose file for Docker that holds all the container details, such as ports and the environment.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash5.png" alt="Writing Bash Scripts" />
<br><sup>deploy function</sup>
</figure>

<p>The last function deploys the project to Kubernetes, which manages docker containers. After all the functions have been coded, we can write the section for accepting user input and store them as variables to be used elsewhere.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash6.png" alt="Writing Bash Scripts" />
<br><sup>echoing success.</sup>
</figure>

<p>and finally, we tell the script to create the project in a specified directory and if it doesn't exist, create it. Then we echo to the user that it was successful.</p>

<p>On first run, it didnt work and that's ok! It seems docker-compose is throwing up an error. I get no response when I asked what version it is (<sup>--version</sup>) so I will re-install it:

<p><code>sudo curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose</code></p>

<p>Now, everything should work.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-dockersuccess.png" alt="Success" />
<br><sup>Success!</sup>
</figure>

<p>There we have it, portable dev environments on my CM5, which are created and deployed using a simple Bash script.</p>

<p> Catch you next time, where we will be going a bit further with this script.<br>
- Dru</p>

<h1 id="code"><em>Code</em></h1>

<a href="./dev-env.sh" target="_blank">dev-env.sh</a>




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
