---
title: "devserver-portable-envrionments"
date: 2025-01-27T16:49:16Z
publishDate: 2025-01-31T00:00:00Z
tags: [devserver]
---

<h1 id="devserver-portable-envrionments"><em>Creating portable environments for the CM5 DevServer </em></h1>

<p>Today I'll be going over portable dev environments and why they are beneficial to every developer, no matter if you're just starting out or fully seasoned.</p>

<h1 id="why-tho"><em>Why, though?</em></h1>
<p>Portable dev environments are incredibly useful and if you're just starting out, be thankful you never endured the pitfalls every developer did 20 years ago, such as machine downtime, version mismatch, operating system incompatability... Nowadays, these issues are rare. Now, we have tools that allow you to create and deploy from pretty much anywhere, on any machine. It doesn't matter if your OS is version 6.7, your colleagues machine is Grape, NodeJS is version 21 on the main project machine but verison 23 on all the other machines.. your project will still work and you can continue to develop and deploy even if these variables change further. The greastest strength is that with portable dev environments, you can run select versions of your project alongside other versions that are completely and totally isolated from each other. If you have a bug in one version, but the other version works perfectly, you can use each version to successfully identify the issue without suffering downtime on the version that has been released.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-cm5.png" alt="CM5 via SSH " />
<br><sup>Connecting to CM5 Dev Server via SSH</sup>
</figure>

<h1 id="VSCode"><em>VSCode</em></h1>
<p>We're going to go off on a tangent here slightly and discuss VSCode, which has been a game changer in the development scene. Next to Vim, it's the most powerful code editor in your toolkit, highly customizable, has a vast range of plugins developed by a dedicated community, easy to use and better yet, allows you to connect and develop remotely via SHH. Tne best thing for me about VSCode is that it supports vim keybidings, so I get the full Vim experience while using VS. Vim is just as powerful and also has a vast array of plugins but harder to get to grips with and set up as an IDE. It's more suited to powerusers than hobbyists or general developers, but developing over SSH is also possible with Vim using an SSH tunnel. I will be covering more on Vim and VSCode in seperate posts in the future, including how to set up Vim as an IDE, so stay tuned for those.</p>

<h1 id="settingup"><em>Setting up &amp; scripting with Bash</em></h1>
<p>Starting up the CM5, which is quite noisy at the minute due to the old fan (you'll be pleased to know I ordered 2 new fans, using the old fan is something I covered <a href="https://dntstck.github.io/blog/devserver/devserver-upgrades">here</a>), I will be going straight to the terminal on my main development machine and I won't have to wait long to connect as the CM5 is lightning fast to boot. </p>

<p>I'll be writing a bash script for this, I write bash scripts for pretty much everything where I can, it's good practice and saves you time in the long run especially for tasks like this, the script can be saved and ported to pretty much any linux machine. This way, you can set up and run a portable dev environment no matter where you are.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash.png" alt="Writing Bash Scripts" />
<br><sup>Starting Vim</sup>
</figure>

<p>So first we open up Vim using the filename we want to create. I place all my scripts in a /script folder in my /dev directory, where all my projects are located. We start our bash script with a Shebang (#!/bin/bash) that tells Bash (the terminal) that this file is a bash script. Now if you have experience with bash commands you will start to notice commands that you recognise and this is all bash scripts are, executable terminal commands with a bit of extra functionality. Feel free to follow along with the pictures, some of the code is missing from the photos but don't fret, I'll post the full code at the end of the post.
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

<p>The next function executes code installs Kubernetes Lite. (K3s)</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash4.png" alt="Writing Bash Scripts" />
<br><sup>docker_compose function</sup>
</figure>

<p>This function creates a compose file for Docker that holds all the container details, such as ports and the environment, here it's NodeJS.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash5.png" alt="Writing Bash Scripts" />
<br><sup>deploy function</sup>
</figure>

<p>The last function deploys the project to Kubernetes, which manages containers. After all the functions have been coded, we can write the section for accepting user input and store them as variables to be used elsewhere.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-bash6.png" alt="Writing Bash Scripts" />
<br><sup>echoing success.</sup>
</figure>

<p>and finally, we tell the script to create the project in a specified directory and if it doesn't exist, creat eit. Then we echo to the user that it was successful.</p>

<p>On first run, it didnt work. and that's ok! scripts should never work first try. It seems docker-compose is throwing up an error. So I will re-install it as not even asking it what version it is works:

<code>sudo curl -L "https://github.com/docker/compose/releases/download/v2.10.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose</code>

<p>Now, everything should work.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devenv-dockersuccess.png" alt="Success" />
<br><sup>Success!</sup>
</figure>

<p>There you have it, a portable dev environment using docker and kubernetes, that you can take anywhere as a script and deploy anywhere you like.</p>

<p> Catch you next time, where we will be going a bit further with this script.
- Dru</p>

<h1 id="code"><em>Code</em></h1>

<code>

install_docker() {
    echo "nstalling docker..."
    sudo apt-get update
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) \
       stable"
    sudo apt-get update # sudo apt update if on Ubuntu
    sudo apt-get install -y docker-ce # sudo apt install -y docker-ce if on ubuntu
    sudo usermod -aG docker ${USER}
    echo "docker installed."
}

install_k3s() {
    echo "Installing K3s..."
    curl -sfL https://get.k3s.io | sh -s - --docker
    echo "K3s installed"
}

create_dockerfile() {
    cat <<EOF > Dockerfile

FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOF
    echo "Dockerfile created."
}

create_docker_compose() {
    cat <<EOF > docker-compose.yml
version: '3'
services:
  web:
    image: my-node-app
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
EOF
    echo "docker-compose.yml created."
}


deploy_k3s() {
    kubectl create deployment $project_name --image=$image_name
    kubectl expose deployment $project_name --type=LoadBalancer --port=8080
    echo "Project deployed to K3s."
}


read -p "Enter project name: " project_name
read -p "Enter project directory (absolute path): " project_directory
read -p "Enter Docker image name: " image_name
read -p "Do you want to install Docker? (yes/no): " install_docker_choice
read -p "Do you want to install K3s? (yes/no): " install_k3s_choice
read -p "Do you want to deploy the project with K3s? (yes/no): " deploy_k3s_choice


if [ "$install_docker_choice" = "yes" ]; then
    install_docker
fi


if [ "$install_k3s_choice" = "yes" ]; then
    install_k3s
fi

mkdir -p $project_directory
cd $project_directory

create_dockerfile
create_docker_compose

docker-compose up -d

if [ "$deploy_k3s_choice" = "yes" ]; then
    deploy_k3s
fi

echo "setup complete."

</code>

