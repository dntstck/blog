---
title: "gitserver-setup"
date: 2026-07-29T18:46:27Z
publishDate: 2026-07-30T00:00:00Z
featured: false
devlog: false
tags: [development, git, server, linux]
---

## setting up a gitserver using gogs

currently i have a spare debian machine that is not tied to a role, so today i am going to set up a local git server using gogs.

## why gogs?

gogs is FAST. not only is it fast; it uses very little ram and cpu power because it is one tiny little binary that doesnt link to any others,
uses no background services, no daemons and no frameworks. which is why it runs so well on old hardware.
gogs is written in go (go git server) and go's runtime is designed for:

- low latency network servers
- tiny memory footprints
- fast context switching
- minimal syscalls

## the elegance and beauty of lightweight services
 
i coupled my gogs install with the secret weapon, sqlite. a database which is really just one file. reads and writes are direct, atomic, and fast.
this is why gogs idles at 50-80mb ram and stays under 150mb even when pushing repos.

gogs uses git underneath the hood. it doesnt try to interpet or recreate it, merely hands off the heavy lifting and git itself is extremely efficient.

the web ui is also intentionally simple. no react, vue, spa and no client side rendering, just simple, basic and lightweight templates.

throw all of these together and you have blazing fast software that is reactive, doesnt leak memory, doesnt balloon over time and doesnt build caches until swap death.

## machine specs

- dell vostro a100 (rare x64 version)
- 2gb ram
- 500gb hdd
- 160w pico psu

this machine absolutely sips power. i dont think it goes much over the 20watt mark, so it is perfect for an always on git server where i can store and access my code locally.
good practice to have a few backups of your code/projects and a local gitserver is always handy to have.

just a quick note on the architecture, this isnt the 32bit model. dell did release a 64bit version of this motherboard and im lucky enough to own one.
i found it on ebay for 25$ with a pico psu included and had no knowledge it was x64 until i successfully installed debian x64 on it. every cloud :)

## installation

i could compile from source, but a large go build on this machine would take a while. considering there are prebuilt releases available; i can just download gogs for the correct architecture.

![wget gogs](/assets/img/gitserver-wget.png)

```bash 
wget https://github.com/gogs/gogs/releases/download/v0.14.3/gogs_v0.14.3_linux_amd64.tar.gz

```

quickly grab sqlite3 & make req dirs:

```bash
sudo apt install sqlite3
mkdir /opt/gogs
```

![create gogs user](assets/img/gitserver-user.png)

create gogs user:

```bash
sudo useradd -r -d /opt/gogs -s /usr/sbin/nologin gogs
sudo chown -R gogs:gogs /opt/gogs
```

create dir for repos:

```bash
sudo mkdir /opt/gogs-repos
sudo chown gogs:gogs /opt/gogs-repos
```

now to extract & install gogs:

```bash 
tar -xzvf gogs_*_linux_amd64.tar.gz
mv gogs /opt/gogs
```

first run to generate the config:

```bash
cd /opt/gogs
sudo -u gogs ./gogs web
```

now the gogs web ui can be accessed at my gitservers ip:

```bash
http://192.168.10.164:3000/install
```

![gogs web ui](assets/img/gogs-web.png)

## web setup

- database type: sqlite3
- path: /opt/gogs/data/gogs.db
- app name: gogs
- repo root path: /opt/gogs-repos
- run user: gogs
- domain: 192.168.10.164
- ssh port: 22
- log path: /opt/gogs/log
- default branch: master
- email settings: ignored this, not required
- server settings: self registration disabled, sign in required to view pages
- username, password & email.

click install and web install is done.

## systemd service

```bash
sudo vim /etc/systemd/system/gogs.service
```

unit file:

```bash
[Unit]
Description=Gogs Git Service
After=network.target

[Service]
User=gogs
Group=gogs
WorkingDirectory=/opt/gogs
ExecStart=/opt/gogs/gogs web
Restart=always
Environment=USER=gogs HOME=/opt/gogs

[Install]
WantedBy=multi-user.target
```

and finally:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now gogs
sudo systemctl status gogs
```

![gogs web login](assets/img/gogs-login.png)

now gogs is fully installed with an activated and running systemd service.
i can now back up any important projects, codebases, logs etc to my own personal gitserver without having to rely on github,
as i only use github as a public personal mirror for any important or public facing projects.

