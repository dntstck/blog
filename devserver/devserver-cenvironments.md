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
<script src=""></script>
<h1 id="devblogbuild">C Dev Environments ft. Docker &amp; Kubernetes, Vim, VSCode &amp; SSH </h1>

<p>
Today let's cover some more advanced topics; setting up C projects for Vim using Docker and Kubernetes, with a bash script that generates the project based on user input. We'll also cover how to achieve the same with VS Code, using SSH with VS Code to develop remotely, and explore using Vim through an SSH tunnel. By the end of this blog post, we will have some seriously powerful and adaptable C development environments tailored to our workflow.

If you can work your way around the command line, have a basic understanding of Vim &amp; writing bash scripts, you should be able to follow this guide with ease.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/multiple-ssh.png" alt="Multiple SSH" />
<br><sup>Connecting to CM5 &amp; Pi Zero2 via SSH</sup>
</figure>

<p>This is a long guide, so grab a beverage, get comfortable and let's get started improving your workflow and efficiency.</p>

<h1 id="why">Why?</h1>

<p>Developing C programs in these environments ensures your project is deployable across a myriad of machines, is easily maintainable and scalable. Development is simplified with the use of Docker and Kubernetes, projects are remotely accessible via SSH and remain completely consistent. Bash automates the entire project generation process giving us error free, consistent boilerplates. This doesn't just apply to C projects either, you can do the same with pretty much any language and pretty much any environment, I'm using C as an example because bar JavaScript and PHP, it's my favourite language.</p>

<h1><b>Now that's apt</b></h1>

<p>Before we get started, we need to ensure we have the following packages installed on our system:
</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/aptget.png" alt="Apt" />
<br><sup>Apting packages</sup>
</figure>

<p><b>Docker:</b> To containerize our development environments.<br>
<b>Kubernetes (kubectl and minikube):</b> For deploying containers.<br>
<b>Vim:</b> For editing code.<br>
<b>Bash:</b> For scripting.<br>
<b>Git/Github:</b> For version control.<br>
<b>Dev Packages:</b> Essential Development Packages such as build-essentials or gcc.</p><br>

<h1>Bash Scripting for Project Generation</h1>

<p>Let's create a bash script that generates a new C project based on user input. This script will set up the project structure and initialize a Git repository.</p>

<h1>Create the Script File</h1>

<p>touch create_c_project.sh</p><br>

<p>chmod +x create_c_project.sh</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cdevenv.png" alt="Creating C Dev Envs" />
<br><sup>Creating a C Dev Env</sup>
</figure>

<p>Download <a href="./scripts/newcproj.sh">sh script</a></p><br>

<h3 id="dockering">Dockerizing the Development Environment</h1>

<p>Docker enables us to create consisent dev environments across mutiple machines.

In your project directory, create a Dockerfile.</p>

<p>cd projectname<br>
touch Dockerfile<p>

<p>Download <a href="./scripts/Dockerfile"> Dockerfile</a></p>

<p>Build the docker image with this command</p>


<p>docker build -t projectname-image . </p>


<p><b>Run the Docker Container:</b></p><br>


<p>docker run -it --name projectname-container project-image</p>


<p>This command starts the container and opens Vim inside it.</p>

<h1>Deploying with Kubernetes</h1>

<p>Let's deploy our Docker container using Kubernetes to orchestrate it.</p>

<p><b>Start Minikube</b></p>

<p>First, ensure Minikube is running.</p>

</p>minikube start</p>

<p><b>Create a Kubernetes Deployment</b></p>
<p>Create a file named <a href="./scripts/deployment.yml">deployment.yml</a></p>

<h1>Apply the Deployment</h1>


<p>kubectl apply -f deployment.yml</p>


<h1>Expose the Deployment</h1>


<p>kubectl expose deployment $PROJECT_NAME-deployment --type=NodePort --port=8080<p>


<h1>Accessing the Application</h1>

<p>Since our application is set to run Vim inside the container, we can exec into the pod.</p>


<p>kubectl get pods</p>


kubectl exec -it \<pod-name\> -- /bin/bash


<p>Now we're inside the container's shell and can run Vim or any other commands.</p>

<h1>Setting Up C Projects for VS Code with Docker and Kubernetes</h1>

<p>Let's begin by configuring VS Code for our C projects.</p>

<p><b>Configuring VS Code for C Development</b></p>

<p>Ensure you have VS Code installed along with the following extensions:</p>

<p><b>C/C++ (ms-vscode.cpptools):</b><br>
 <sup>Provides C/C++ language support.</sup><br>
<b>Docker (ms-azuretools.vscode-docker):</b> <br>
<sup>For Docker integration.</sup><br>
<b>Kubernetes (ms-kubernetes-tools.vscode-kubernetes-tools):</b> <br>
<sup>For Kubernetes support.</sp<br></p>

<h1>Docker Integration with VS Code</h1>

<p>VS Code can interact directly with Docker to build and run containers. In your project directory, create a .devcontainer folder with two files: devcontainer.json and Dockerfile</p>

<a href="./scripts/devcontainer.json">devcontainer.json</a><br>

<a href="./scripts/vsDockerfile">Dockerfile</a><br>

<h1>Open the Project in a Dev Container</h1>

<p><b>1.</b> Press F1 in VS Code.<br>
<b>2.</b> Select **Remote-Containers: Open Folder in Container...<br>
<b>3.</b> Choose your project folder.</p><br>

<p>VS Code will build the Docker image and reopen the project inside the container.</p><br>

<h1>Automating Project Setup with Bash Scripts</h1>

<p>Create a script <a href="./scripts/create_vs_project.sh">create_vs_project.sh</a> that automates the setup.</p>


<h1 id="vscodessh">Using SSH with VS Code</h1>

<p>VSCode has robust support for remote development over SSH, allowing us to work seamlessly on remote machines. Extremely useful for purposes like mine, using a CM5 DevServer to develop remotely... I can work on entire projects in any language, in any environment where ever I am.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-ssh.png" alt="VSCode SSH" />
<br><sup>VSCode &amp; SSH</sup>
</figure>

<h1>Setting Up SSH Connections</h1>

<p>First, we need to install the Remote Development Extension Pack, which can be located in the Extensions Marketplace<br> <b>(Ctrl + Shift + X)</b>:</p>
<p>
Remote - SSH (ms-vscode-remote.remote-ssh)
 </p>
<br><sup>Core extension for SSH.</sup></p>

<h1>Configure SSH in VS Code</h1>

<p><b>1.</b> Press <sup>F1</sup> and select <b>Remote-SSH: Add New SSH Host...</b><br>
<b>2.</b> Enter your SSH connection string, e.g. mine: sysadmin@cm5.local<br>
<b>3.</b> Choose the SSH configuration file to update (usually ~/.ssh/config).</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-connectssh.png" alt="Connecting to SSH" />
<br><sup>Connecting to SSH with VSCode</sup>
</figure>

<h1>Remote Development over SSH</h1>

<p><b>Press <sup>F1</sup></b> and select <b>Remote-SSH: Connect to Host...</b><br>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-host.png" alt="VSCode SSH" />
<br><sup>VSCode &amp; connect to SSH host</sup>
</figure>
<b>Choose</b> your configured host.<br>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-ssh-cm5local.png" alt="VSCode SSH" />
<br><sup>VSCode &amp; CM5 SSH</sup>
</figure>
<b>VS Code</b> will connect to the remote server. You'll see <b>[SSH: remote-server]</b> in the bottom-left corner.</p>
<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-ssh.png" alt="VSCode SSH" />
<br><sup>VSCode &amp; connected via SSH to cm5.local</sup>
</figure>
<h1>Enhancing Workflow with Extensions</h1>

<p><b>Install Extensions on Remote:</b><br>
  When connected to the remote server, install any necessary extensions. VS Code will prompt you to install them on the remote host.
  <br>
<b>Work with Remote Files:</b><br>
  Open folders and files on the remote server as if they were local.
  <br>
<b>Integrated Terminal:</b><br>
  Use the integrated terminal to run commands on the remote machine.
</p>

<h1>Using Vim through an SSH Tunnel</h1>

<p>When you need to edit files on a remote server using Vim over SSH, tunneling can enhance security and flexibility.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vim-scp2.png" alt="Vim SCP" />
<br><sup>Connected to CM5 with Vim via SCP</sup>
</figure>

<h1>Establishing an SSH Tunnel</h1>

<p>An SSH tunnel forwards a local port to a remote server.</p>

<h1>Basic SSH Connection</h1>


<p>ssh user@remote-server</p>


<h1>ssh</codde> Tunnel Command</h1>


<p>ssh -L local_port:localhost:remote_port user@remote-server</p>


<figure>
<img src="{{ site.baseurl }}/devserver/img/cm5-sshtunnel.png" alt="SSH Tunnel" />
<br><sup>SSH Tunnel</sup>
</figure>

<h1>Example</h1>

<p><b>Forward local port 8080 to remote port 80:</b></p>


<p>ssh -L 8080:localhost:80 sysadmin@cm5.local</p>


<h1>Vim for Remote Development</h1>

<p>Simply SSH into your remote server and run Vim to edit files.</p>


<p>ssh user@remote-server</p>
<p>vim /path/to/your/file.c</p>


<h1>Using Vim's Native Remote Editing</h1>

<p>Vim supports editing remote files using protocols like scp and sftp.</p>


<p>vim scp://user@remote-server//path/to/your/file.c</p>


<figure>
<img src="{{ site.baseurl }}/devserver/img/vim-scp.png" alt="Vim SCP" />
<br><sup>Connecting to CM5 with Vim via SCP</sup>
</figure>

<p><b>Note the double slash</b>after the hostname.</p>

<h1>Leveraging Vim Plugins for Remote Work</h1>

<p>Enhance your Vim experience with plugins designed for remote development.</p>

<h1>vim-scp</h1>

vim scp://user@remote-server//path/to/your/project/

<p>Now you can navigate directories and edit files as needed.</p>

<h1 id="wrapup">Wrapping it up</h1>

<p>We've journeyed through setting up C projects for Vim and VS Code using Docker and Kubernetes, automated project creation with bash scripts, and explored remote development over SSH in both editors. By harnessing containers and remote connections, we can create a consistent, portable development environment that suits our workflow, we have achieved a lot in this post so be proud of yourself if you got this far and start to utilise some of the aspects we've discussed here.</p>

<p>Catch you next time<br>

Dru</p>

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
