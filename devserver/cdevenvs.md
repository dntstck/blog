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

<em><b><h1 id="bashgen">Bash Scripting for Project Generation</em></h1></b>

<p>Let's create a bash script that generates a new C project based on user input. This script will set up the project structure and initialize a Git repository.</p>

<h3><em>Create the Script File</em></h3>

<p><code>touch create_c_project.sh</code></p>

<p><code>chmod +x create_c_project.sh</code></p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cdevenvpng" alt="Creating C Dev Envs" />
<br><sup>Creating a C Dev Env</sup>
</figure>

<h3 id="devblogbuild"><em>Script</em></h3>

<p><code>#!/bin/bash</code>

<code>echo "Enter your project name:"</code>
<code>read PROJECT_NAME</code>

<code>echo "Creating project '$PROJECT_NAME'..."</code>

<code>mkdir $PROJECT_NAME</code>
<code>cd $PROJECT_NAME</code>

<code>git init</code>

<code>mkdir src include bin</code>
<code>touch src/main.c</code>
<code>touch Makefile</code>

<code>cat \<\<EOL > src/main.c</code>
<code>#include <stdio.h></code>

<code>int main() {</code>
<code>    printf("Hello, World!\\n");</code>
<code>    return 0;</code>
<code>}</code>
<code>EOL</code>

<code>cat \<\<EOL \> Makefile</code>
<code>CC=gcc</code>
<code>CFLAGS=-Iinclude</code>

<code>all: \$(PROJECT_NAME)</code>

<code>\$(PROJECT_NAME): src/main.c</code>
<code>	\$(CC) src/main.c -o bin/\$(PROJECT_NAME) \$(CFLAGS)</code>
<code>EOL</code>

<code>echo " '$PROJECT_NAME' created successfully"</code></p>

<h3 id="srclook"><em>Source Explained</em></h3>

<p>
<b>User Input:</b> The script prompts the user for a project name.<br>
<b>Directory Structure</b> Creates `src`, `include`, and `bin` directories.<br>
<b>Main File</b> Generates a simple `main.c` file.<br>
<b>Makefile</b> Sets up a basic Makefile for building the project.</p>

<h3 id="dockering"><em>Dockerizing the Development Environment</em></h3>

<p>Docker enables us to create consisent dev environments across mutiple machines. 

In your project directory, create a `Dockerfile`.</p>

<code>cd $PROJECT_NAME</code>
<code>touch Dockerfile</code>

<em><h3>Dockerfile</em></h3>

<code>FROM gcc:latest</code><br>
<code>WORKDIR /usr/src/app</code><br>
<code>COPY . .</code><br>
<code>RUN apt-get update && apt-get install -y vim</code><br>
<code>RUN make</code><br>
<code>CMD ["vim"]</code><br>
<br>

<em><h3>Build the Docker Image</em></h3>

<p><b><em>Build the docker image with this command:</b></em></p>

<code>docker build -t $PROJECT_NAME-image . </code>

<p><b><em>Run the Docker Container:</b></em></p><br>

<code>docker run -it --name $PROJECT_NAME-container $PROJECT_NAME-image</code>

<p>This command starts the container and opens Vim inside it.</p>

<h3>Deploying with Kubernetes</h3>

<p>Let's deploy our Docker container using Kubernetes to orchestrate it.</p>

<p><b><em>Start Minikube</b></em></p>

<p>First, ensure Minikube is running.</p>

<code>minikube start</code>

<p><b><em>Create a Kubernetes Deployment</b></em></p>
<p>Create a file named <code>deployment.yml</code><p>

<b><sup>deployment.yml</sup></b>
<code>apiVersion: apps/v1</code>
<code>kind: Deployment</code>
<code>metadata:</code>
<code>  name: $PROJECT_NAME-deployment</code>
<code>spec:</code>
<code>  replicas: 1</code>
<code>  selector:</code>
<code>    matchLabels:</code>
<code>      app: $PROJECT_NAME</code>
<code>  template:</code>
<code>    metadata:</code>
<code>      labels:</code>
<code>        app: $PROJECT_NAME</code>
<code>    spec:</code>
<code>      containers:</code>
<code>      - name: $PROJECT_NAME-container</code>
<code>        image: $PROJECT_NAME-image</code>
<code>        imagePullPolicy: Never</code>
<code>        command: ["vim"]</code>
</code>

<h3><em>Apply the Deployment</em></h3>

<code>kubectl apply -f deployment.yml</code>

<h3><em>Expose the Deployment</h3></em>

<code>kubectl expose deployment $PROJECT_NAME-deployment --type=NodePort --port=8080</code>

<h3><em>Accessing the Application</h3></em>

<p>Since our application is set to run Vim inside the container, we can exec into the pod.</p>

<code>kubectl get pods</code>
<code>kubectl exec -it \<pod-name\> -- /bin/bash</code>

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

<code>{</code>
<code>    "name": "$PROJECT_NAME",</code><br>
<code>    "dockerFile": "Dockerfile",</code><br>
<code>    "extensions": [</code><br>
<code>        "ms-vscode.cpptools"</code><br>
<code>    ],</code><br>
<code>    "settings": {},</code><br>
<code>    "workspaceFolder": "/workspace",</code><br>
<code>    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind"</code><br>
<code>}<br></code>


<p><h3><em>Dockerfile</h3></em></p><br>

<code>FROM gcc:latest</code>
<code></code>
<code>\# Install necessary packages</code>
<code>RUN apt-get update && apt-get install -y vim</code>
<code></code>
<code>\# Set the working directory</code>
<code>WORKDIR /workspace</code>


<h3><em>Open the Project in a Dev Container</em></h3>

<p><b>1.</b> Press `F1` in VS Code.<br>
<b>2.</b> Select **Remote-Containers: Open Folder in Container...<br>
<b>3.</b> Choose your project folder.</p><br>

<p>VS Code will build the Docker image and reopen the project inside the container.</p><br>

<h3><em>Automating Project Setup with Bash Scripts</em></h3>

<p>Create a script <code>create_vs_project.sh</code> that automates the setup.</p>

<code>#!/bin/bash</code><br>
<code></code>
<code>echo "Enter your project name:"</code>
<code>read PROJECT_NAME</code>
<code></code>
<code> \# (Same as previous script, plus:)</code>
<code>\# Create .devcontainer files</code>
<code>mkdir .devcontainer</code>
<code>cat \<\<EOL > .devcontainer/devcontainer.json</code>
<code>{</code>
<code>    "name": "$PROJECT_NAME",</code>
<code>    "dockerFile": "Dockerfile",</code>
<code>    "extensions": [</code>
<code>        "ms-vscode.cpptools"</code>
<code>    ],</code>
<code>    "settings": {},</code>
<code>    "workspaceFolder": "/workspace",</code>
<code>    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind"</code>
<code>}</code>
<code>EOL</code>
<code></code>
<code>cat \<\<EOL \> .devcontainer/Dockerfile</code>
<code>FROM gcc:latest</code>
<code></code>
<code>RUN apt-get update && apt-get install -y vim</code>
<code>WORKDIR /workspace</code>
<code>EOL</code>
<code></code>
<code>echo "VS Code dev container configured."</code>
</code>

<h1 id="vscodessh"><em>Using SSH with VS Code</em></h1>

<p>VSCode has robust support for remote development over SSH, allowing us to work seamlessly on remote machines. Extremely useful for purposes like mine, using a CM5 DevServer to develop remotely... I can work on entire projects in any language, in any environment where ever I am.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-ssh.png" alt="VSCode SSH" />
<br><sup>VSCode &amp; SSH</sup>
</figure>

<h3><em>Setting Up SSH Connections</em></h3>

<p>First, we need to install the Remote Development Extension Pack, which can be located in the Extensions Marketplace<br> <b>(Ctrl + Shift + X)</b>:</p>
<p><code>Remote - SSH (ms-vscode-remote.remote-ssh)</code> </p>
<br><sup>Core extension for SSH.</sup></p>

<h3><em>Configure SSH in VS Code</em></h3>

<p><b>1.</b> Press <sup>F1</sup> and select <b>Remote-SSH: Add New SSH Host...</b><br>
<b>2.</b> Enter your SSH connection string, e.g. mine: <code>sysadmin@cm5.local</code><br>
<b>3.</b> Choose the SSH configuration file to update (usually <code>~/.ssh/config</code>).</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vscode-connectssh.png" alt="Connecting to SSH" />
<br><sup>Connecting to SSH with VSCode</sup>
</figure>

<h3><em>Example </em><code>~/.ssh/config</code> <em>Entry</em></h3>


<code>Host remote-server</code>
<code>    HostName your.server.ip.address</code>
<code>    User your_username</code>
<code>    IdentityFile ~/.ssh/id_rsa</code>


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

<code>
ssh user@remote-server
</code>

<h3><em><code>ssh</codde> Tunnel Command</h3></em>

<code>
ssh -L local_port:localhost:remote_port user@remote-server
</code>

<figure>
<img src="{{ site.baseurl }}/devserver/img/cm5-sshtunnel.png" alt="SSH Tunnel" />
<br><sup>SSH Tunnel</sup>
</figure>

<h3><em>Example</h3></em>

<p><b>Forward local port 8080 to remote port 80:</b></p>

<code>
ssh -L 8080:localhost:80 sysadmin@cm5.local
</code>

<h3><em>Vim for Remote Development</h3></em>

<p>Simply SSH into your remote server and run Vim to edit files.<p>

<code>
ssh user@remote-server
vim /path/to/your/file.c
</code>

<h3><em>Using Vim's Native Remote Editing</h3></em>

<p>Vim supports editing remote files using protocols like <code>scp</code> and <code>sftp</code>.</p>

<code>
vim scp://user@remote-server//path/to/your/file.c
</code>

<figure>
<img src="{{ site.baseurl }}/devserver/img/vim-scp.png" alt="Vim SCP" />
<br><sup>Connecting to CM5 with Vim via SCP</sup>
</figure>

<p><b>Note the double slash</b>>after the hostname.</p>

<h3><em>Leveraging Vim Plugins for Remote Work</h3></em>

<p>Enhance your Vim experience with plugins designed for remote development.</p>

<h3><em>vim-ftp and vim-sftp</h3></em>

<p><b>Installation:</b>

  Use a Vim plugin manager such as vundle or vim-plug.<br>
  <sup>.vimrc</sup><br>
  <code>call plug#begin('~/.vim/plugged')</code>
  <code>Plug 'tpope/vim-vinegar'</code>
  <code>call plug#end()</code>
  </p>

<h3><em>Netrw Configuration</h3></em>

<p>Netrw is Vim's built-in file explorer, capable of handling remote files.</p><br>
<sup>.vimrc</sup><br>
<code>let g:netrw_banner=0</code>
<code>let g:netrw_liststyle=3</code>

<h3><em>Example Usage</h3></em>

<p>Open the remote directory:</p>

<code>vim scp://user@remote-server//path/to/your/project/</code>

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
