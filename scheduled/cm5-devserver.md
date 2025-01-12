---
title: "CM5 Dev Server"
date: 2025-01-11T02:05:00Z
publishDate: 2025-01-12T04:00:00Z
tags: [devserver]
---

## *Setting up the Dev Server*

The next step was to configure the CM5 itself as a development server. I installed all the relevant packages on the CM5:
```sh
 sudo apt install build-essential git mariadb-server nginx php lua nodejs docker.io
```
I decided against installing Vim, because I much prefer to build it myself from src and configure it as an IDE (more on that another time).

I started docker, set up docker compose and created a user group for it
```sh
sudo usermod -aG docker ${USER} 
```

 then installed kubernetes lite (k3s) through curl: 

```sh
curl -sfL https://get.k3s.io | sh - 
```

configured it to my needs and deployed my first container, a simple nginx server just to test everything was working correctly. I write scripts for simple tasks, so I wrote a script to deploy K8s dependent on what I need it for so the command was:

```sh
./deploy_k8s.sh nginx 80
```

This deployed nginx on port 80.

To connect to the Dev Server/Home Dev Network, I would use ssh tunnel and connect on my main machine using:

```sh
ssh -L 8080:localhost:80 sysadmin@cm5.local
```

After running Kubectl and seeing the master node (CM5) and a service (nginx), success was evident.

![KubeCTL](/img/kubectl-running.jpeg)

## *Zero Time*

Now it's time to set up the Zero as a data forwarder. This is incase the CM5 ever goes offline, and data/projects are sent to each other. After trying to run apt update/upgrade I ran into issues with **update-initramfs**, the workaround is to simply go edit your conf:

```sh
sudo nano /etc/initramfs-tools/initramfs.conf
```

and update MODULES from dep to most

```sh
MODULES=most
```

update it:

```sh
sudo update-initramfs -u

```

then reconfig dpkg:
```sh
sudo dpkg --configure -a

```

All fixed.

Now back to installing the Zero as a data forwarder, this will forward data from the cm5 to the zero in an outage/downtime and I'll use rsync, bash and cron for this. 

On the Zero I created a script:

```sh
#!/bin/bash

# data_cm5.sh

SOURCE_DIR="/home/sysadmin/dev"  # CM5's dir
DESTINATION_DIR="/home/sysadmin/dev-cm5"  # Pi Zero's dir
REMOTE_USER="sysadmin"  # Username on CM5
REMOTE_HOST="cm5.local"  # IP address of CM5

rsync -avz $REMOTE_USER@$REMOTE_HOST:$SOURCE_DIR $DESTINATION_DIR
```

then make the script executable with
```sh
$ chmod +x ~/data_cm5.sh
```

and enable it to run hourly with cron:

```sh
crontab -e
0 * * * * /home/sysadmin/data_cm5.sh
```

We need RSA keys here otherwise it will prompt for my password each time the script runs, which is useless if I'm AFK.

```sh
ssh-keygen -t rsa -b 2048
ssh-copy-id sysadmin@cm5.local
```

That should do it. Every hour, anything in the CM5's /dev folder will be synced to the Pi Zeros /dev-cm5 folder.

## Lessons Learned

Throughout this journey, I've encountered challenges and discovered solutions that have expanded my understanding of embedded systems, server management and aspects of kubernetes I wasn't aware of, this education came from making mistakes and running into issues. You don't learn anything unless you make mistakes or encounter problems and overcome them, so this has been a valid lesson!
