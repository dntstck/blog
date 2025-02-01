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

<h1 id="devblogbuild"><em>C Dev Environments ft. Docker &amp; Kubernetes, Vim, VSCode &amp; SSH </em></h1>

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

<h1><b><em>Packages</em></b></h1>

<p>Before we get started, we need to ensure we have the following installed on our system:
</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/apt.png" alt="CM5 SSH" />
<br><sup>Apting packages</sup>
</figure>

<p><b>Docker:</b> To containerize our development environments.<br>
<b>Kubernetes (kubectl and minikube):</b> For deploying containers.<br>
<b>Vim:</b> For editing code.<br>
<b>Bash:</b> For scripting.<br>
<b>Git/Github:</b> For version control.<br>
<b>Dev Packages:</b> Essential Development Packages such as build-essentials or gcc.</p><br>

<em><h1>Bash Scripting for Project Generation</h1></em>

<p>Let's create a bash script that generates a new C project based on user input. This script will set up the project structure and initialize a Git repository.</p>

<h3><em>Create the Script File</em></h3>

<p><span><code>touch create_c_project.sh</code></span></p>

<p><span><code>chmod +x create_c_project.sh</code></span></p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cdevenvpng" alt="Creating C Dev Envs" />
<br><sup>Creating a C Dev Env</sup>
</figure>

<h3 id="devblogbuild"><em>Script</em></h3>

<p><span><code>#!/bin/bash</code></span>

<span><code>echo "Enter your project name:"</code></span>
<span><code>read PROJECT_NAME</code></span>

<span><code>echo "Creating project '$PROJECT_NAME'..."</code></span>

<span><code>mkdir $PROJECT_NAME</code></span>
<span><code>cd $PROJECT_NAME</code></span>

<span><code>git init</code></span>

<span><code>mkdir src include bin</code></span>
<span><code>touch src/main.c</code></span>
<span><code>touch Makefile</code></span>

<span><code>cat \<\<EOL > src/main.c</code></span>
<span><code>#include <stdio.h></code></span>

<span><code>int main() {</code></span>
<span><code> printf("Hello, World!\\n");</code></span>
<span><code> return 0;</code></span>
<span><code>}</code></span>
<span><code>EOL</code></span>

<span><code>cat \<\<EOL \> Makefile</code></span>
<span><code>CC=gcc</code></span>
<span><code>CFLAGS=-Iinclude</code></span>

<span><code>all: \$(PROJECT_NAME)</code></span>

<span><code>\$(PROJECT_NAME): src/main.c</code></span>
<span><code> \$(CC) src/main.c -o bin/\$(PROJECT_NAME) \$(CFLAGS)</code></span>
<span><code>EOL</code></span>

<span><code>echo " '$PROJECT_NAME' created successfully"</code></span></p>

<h3 id="srclook"><em>Source Explained</em></h3>

<p>
<b>User Input:</b> The script prompts the user for a project name.<br>
<b>Directory Structure</b> Creates `src`, `include`, and `bin` directories.<br>
<b>Main File</b> Generates a simple `main.c` file.<br>
<b>Makefile</b> Sets up a basic Makefile for building the project.</p>

<h3 id="dockering"><em>Dockerizing the Development Environment</em></h3>

<p>Docker enables us to create consisent dev environments across mutiple machines.

In your project directory, create a `Dockerfile`.</p>

<span><code>cd $PROJECT_NAME</code></span>
<span><code>touch Dockerfile</code></span>

<em><h3>Dockerfile</em></h3>

<span><code>FROM gcc:latest</code></span><br>
<span><code>WORKDIR /usr/src/app</code></span><br>
<span><code>COPY . .</code></span><br>
<span><code>RUN apt-get update && apt-get install -y vim</code></span><br>
<span><code>RUN make</code></span><br>
<span><code>CMD ["vim"]</code></span><br>
<br>

<em><h3>Build the Docker Image</em></h3>

<p><b><em>Build the docker image with this command:</b></em></p>

<span><code>docker build -t $PROJECT_NAME-image . </code></span>

<p><b><em>Run the Docker Container:</b></em></p><br>

<span><code>docker run -it --name $PROJECT_NAME-container $PROJECT_NAME-image</code></span>

<p>This command starts the container and opens Vim inside it.</p>

<h3>Deploying with Kubernetes</h3>

<p>Let's deploy our Docker container using Kubernetes to orchestrate it.</p>

<p><b><em>Start Minikube</b></em></p>

<p>First, ensure Minikube is running.</p>

<span><code>minikube start</code></span>

<p><b><em>Create a Kubernetes Deployment</b></em></p>
<p>Create a file named <span><code>deployment.yml</code></span><p>

<b><sup>deployment.yml</sup></b>
<span><code>apiVersion: apps/v1</code></span>
<span><code>kind: Deployment</code></span>
<span><code>metadata:</code></span>
<span><code> name: $PROJECT_NAME-deployment</code></span>
<span><code>spec:</code></span>
<span><code> replicas: 1</code></span>
<span><code> selector:</code></span>
<span><code> matchLabels:</code></span>
<span><code> app: $PROJECT_NAME</code></span>
<span><code> template:</code></span>
<span><code> metadata:</code></span>
<span><code> labels:</code></span>
<span><code> app: $PROJECT_NAME</code></span>
<span><code> spec:</code></span>
<span><code> containers:</code></span>
<span><code> - name: $PROJECT_NAME-container</code></span>
<span><code> image: $PROJECT_NAME-image</code></span>
<span><code> imagePullPolicy: Never</code></span>
<span><code> command: ["vim"]</code></span>
</code></span>

<h3><em>Apply the Deployment</em></h3>

<span><code>kubectl apply -f deployment.yml</code></span>

<h3><em>Expose the Deployment</h3></em>

<span><code>kubectl expose deployment $PROJECT_NAME-deployment --type=NodePort --port=8080</code></span>

<h3><em>Accessing the Application</h3></em>

<p>Since our application is set to run Vim inside the container, we can exec into the pod.</p>

<span><code>kubectl get pods</code></span>
<span><code>kubectl exec -it \<pod-name\> -- /bin/bash</code></span>

<p>Now we're inside the container's shell and can run Vim or any other commands.</p>

<h1><em>Setting Up C Projects for VS Code with Docker and Kubernetes</em></h1>

<p>Let's begin by configuring VS Code for our C projects.</p>

<p><b><em>Configuring VS Code for C Development<b></em></p>

<p>Ensure you have VS Code installed along with the following extensions:</p>

<p><b>C/C++ (ms-vscode.cpptools):</b><br>
 <sup>Provides C/C++ language support.</sup><br>
<b>Docker (ms-azuretools.vscode-docker):</b> <br>
<sup>For Docker integration.</sup><br>
<b>Kubernetes (ms-kubernetes-tools.vscode-kubernetes-tools):</b> <br>
<sup>For Kubernetes support.</sp<br></p>

<h3><em>Docker Integration with VS Code</em></h3>

<p>VS Code can interact directly with Docker to build and run containers. In your project directory, create a `.devcontainer` folder with two files: `devcontainer.json` and `Dockerfile`</p>

<h3><em>devcontainer.json</h3></em>

<span><code>{</code></span>
<span><code> "name": "$PROJECT_NAME",</code></span><br>
<span><code>    "dockerFile": "Dockerfile",</code></span><br>
<span><code>    "extensions": [</code></span><br>
<span><code>        "ms-vscode.cpptools"</code></span><br>
<span><code>    ],</code></span><br>
<span><code>    "settings": {},</code></span><br>
<span><code>    "workspaceFolder": "/workspace",</code></span><br>
<span><code>    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind"</code></span><br>
<span><code>}<br></code></span>

<p><h3><em>Dockerfile</h3></em></p><br>

<span><code>FROM gcc:latest</code></span>
<span><code></code></span>
<span><code>\# Install necessary packages</code></span>
<span><code>RUN apt-get update && apt-get install -y vim</code></span>
<span><code></code></span>
<span><code>\# Set the working directory</code></span>
<span><code>WORKDIR /workspace</code></span>

<h3><em>Open the Project in a Dev Container</em></h3>

<p><b>1.</b> Press `F1` in VS Code.<br>
<b>2.</b> Select **Remote-Containers: Open Folder in Container...<br>
<b>3.</b> Choose your project folder.</p><br>

<p>VS Code will build the Docker image and reopen the project inside the container.</p><br>

<h3><em>Automating Project Setup with Bash Scripts</em></h3>

<p>Create a script <span><code>create_vs_project.sh</code></span> that automates the setup.</p>

<span><code>#!/bin/bash</code></span><br>
<span><code></code></span>
<span><code>echo "Enter your project name:"</code></span>
<span><code>read PROJECT_NAME</code></span>
<span><code></code></span>
<span><code> \# (Same as previous script, plus:)</code></span>
<span><code>\# Create .devcontainer files</code></span>
<span><code>mkdir .devcontainer</code></span>
<span><code>cat \<\<EOL > .devcontainer/devcontainer.json</code></span>
<span><code>{</code></span>
<span><code> "name": "$PROJECT_NAME",</code></span>
<span><code>    "dockerFile": "Dockerfile",</code></span>
<span><code>    "extensions": [</code></span>
<span><code>        "ms-vscode.cpptools"</code></span>
<span><code>    ],</code></span>
<span><code>    "settings": {},</code></span>
<span><code>    "workspaceFolder": "/workspace",</code></span>
<span><code>    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind"</code></span>
<span><code>}</code></span>
<span><code>EOL</code></span>
<span><code></code></span>
<span><code>cat \<\<EOL \> .devcontainer/Dockerfile</code></span>
<span><code>FROM gcc:latest</code></span>
<span><code></code></span>
<span><code>RUN apt-get update && apt-get install -y vim</code></span>
<span><code>WORKDIR /workspace</code></span>
<span><code>EOL</code></span>
<span><code></code></span>
<span><code>echo "VS Code dev container configured."</code></span>
</code></span>

<h1 id="vscodessh"><em>Using SSH with VS Code</em></h1>

<p>VSCode has robust support for remote development over SSH, allowing us to work seamlessly on remote machines. Extremely useful for purposes like mine, using a CM5 DevServer to develop remotely... I can work on entire projects in any language, in any environment where ever I am.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-ssh.png" alt="VSCode SSH" />
<br><sup>VSCode &amp; SSH</sup>
</figure>

<h3><em>Setting Up SSH Connections</em></h3>

<p>First, we need to install the Remote Development Extension Pack, which can be located in the Extensions Marketplace<br> <b>(Ctrl + Shift + X)</b>:</p>
<p><span><code>Remote - SSH (ms-vscode-remote.remote-ssh)</code></span> </p>
<br><sup>Core extension for SSH.</sup></p>

<h3><em>Configure SSH in VS Code</em></h3>

<p><b>1.</b> Press <sup>F1</sup> and select <b>Remote-SSH: Add New SSH Host...</b><br>
<b>2.</b> Enter your SSH connection string, e.g. mine: <span><code>sysadmin@cm5.local</code></span><br>
<b>3.</b> Choose the SSH configuration file to update (usually <span><code>~/.ssh/config</code></span>).</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-connectssh.png" alt="Connecting to SSH" />
<br><sup>Connecting to SSH with VSCode</sup>
</figure>

<h3><em>Example </em><span><code>~/.ssh/config</code></span> <em>Entry</em></h3>

<span><code>Host remote-server</code></span>
<span><code> HostName your.server.ip.address</code></span>
<span><code> User your_username</code></span>
<span><code> IdentityFile ~/.ssh/id_rsa</code></span>

<h3><em>Remote Development over SSH</em></h3>

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
<h3><em>Enhancing Workflow with Extensions</h3></em>

<p><b>Install Extensions on Remote:</b><br>
  When connected to the remote server, install any necessary extensions. VS Code will prompt you to install them on the remote host.
  <br>
<b>Work with Remote Files:</b><br>
  Open folders and files on the remote server as if they were local.
  <br>
<b>Integrated Terminal:</b><br>
  Use the integrated terminal to run commands on the remote machine.
</p>

<h1><em>Using Vim through an SSH Tunnel</h1></em>

<p>When you need to edit files on a remote server using Vim over SSH, tunneling can enhance security and flexibility.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vim-scp2.png" alt="Vim SCP" />
<br><sup>Connected to CM5 with Vim via SCP</sup>
</figure>

<h3><em>Establishing an SSHTunnel</h3></em>

<p>An SSH tunnel forwards a local port to a remote server.</p>

<h3><em>Basic SSH Connection</h3></em>

<span><code>
ssh user@remote-server
</code></span>

<h3><em><span><code>ssh</codde> Tunnel Command</h3></em>

<span><code>
ssh -L local_port:localhost:remote_port user@remote-server
</code></span>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cm5-sshtunnel.png" alt="SSH Tunnel" />
<br><sup>SSH Tunnel</sup>
</figure>

<h3><em>Example</h3></em>

<p><b>Forward local port 8080 to remote port 80:</b></p>

<span><code>
ssh -L 8080:localhost:80 sysadmin@cm5.local
</code></span>

<h3><em>Vim for Remote Development</h3></em>

<p>Simply SSH into your remote server and run Vim to edit files.</p>

<span><code>
ssh user@remote-server
vim /path/to/your/file.c
</code></span>

<h3><em>Using Vim's Native Remote Editing</h3></em>

<p>Vim supports editing remote files using protocols like <span><code>scp</code></span> and <span><code>sftp</code></span>.</p>

<span><code>
vim scp://user@remote-server//path/to/your/file.c
</code></span>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vim-scp.png" alt="Vim SCP" />
<br><sup>Connecting to CM5 with Vim via SCP</sup>
</figure>

<p><b>Note the double slash</b>after the hostname.</p>

<h3><em>Leveraging Vim Plugins for Remote Work</h3></em>

<p>Enhance your Vim experience with plugins designed for remote development.</p>

<h3><em>vim-ftp and vim-sftp</h3></em>

<p><b>Installation:</b>

Use a Vim plugin manager such as vundle or vim-plug.<br>
<sup>.vimrc</sup><br>
<span><code>call plug#begin('~/.vim/plugged')</code></span>
<span><code>Plug 'tpope/vim-vinegar'</code></span>
<span><code>call plug#end()</code></span>

  </p>

<h3><em>Netrw Configuration</h3></em>

<p>Netrw is Vim's built-in file explorer, capable of handling remote files.</p><br>
<sup>.vimrc</sup><br>
<span><code>let g:netrw_banner=0</code></span>
<span><code>let g:netrw_liststyle=3</code></span>

<h3><em>Example Usage</h3></em>

<p>Open the remote directory:</p>

<span><code>vim scp://user@remote-server//path/to/your/project/</code></span>

<p>Now you can navigate directories and edit files as needed.</p>

<h1 id="wrapup"><em>Wrapping it up</em></h1>

<p>We've journeyed through setting up C projects for Vim and VS Code using Docker and Kubernetes, automated project creation with bash scripts, and explored remote development over SSHin both editors. By harnessing containers and remote connections, we can create a consistent, portable development environment that suits our workflow, we have achieved a lot in this post so be proud of yourself if you got this far and start to utilise some of the aspects we've discussed here.</p>

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
