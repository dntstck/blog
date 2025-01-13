---
title: "Dev Server Setup"
date: 2025-01-08T02:05:00Z
publishDate: 2025-01-12T04:10:00Z
tags: [devserver]
---

<h2 id="setting-up-the-dev-server"><em>Setting up the Dev
Server</em></h2>
<p>The next step was to configure the CM5 itself as a development
server. I installed all the relevant packages on the CM5:</p>
<div class="sourceCode" id="cb1"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb1-1"><a href="#cb1-1" aria-hidden="true" tabindex="-1"></a> <span class="fu">sudo</span> apt install build-essential git mariadb-server nginx php lua nodejs docker.io</span></code></pre></div>
<p>I decided against installing Vim, because I much prefer to build it
myself from src and configure it as an IDE (more on that another
time).</p>
<p>I started docker, set up docker compose and created a user group for
it</p>
<div class="sourceCode" id="cb2"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb2-1"><a href="#cb2-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> usermod <span class="at">-aG</span> docker <span class="va">${USER}</span> </span></code></pre></div>
<p>then installed kubernetes lite (k3s) through curl:</p>
<div class="sourceCode" id="cb3"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb3-1"><a href="#cb3-1" aria-hidden="true" tabindex="-1"></a><span class="ex">curl</span> <span class="at">-sfL</span> https://get.k3s.io <span class="kw">|</span> <span class="fu">sh</span> <span class="at">-</span> </span></code></pre></div>
<p>configured it to my needs and deployed my first container, a simple
nginx server just to test everything was working correctly. I write
scripts for simple tasks, so I wrote a script to deploy K8s dependent on
what I need it for so the command was:</p>
<div class="sourceCode" id="cb4"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb4-1"><a href="#cb4-1" aria-hidden="true" tabindex="-1"></a><span class="ex">./deploy_k8s.sh</span> nginx 80</span></code></pre></div>
<p>This deployed nginx on port 80.</p>
<p>To connect to the Dev Server/Home Dev Network, I would use ssh tunnel
and connect on my main machine using:</p>
<div class="sourceCode" id="cb5"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb5-1"><a href="#cb5-1" aria-hidden="true" tabindex="-1"></a><span class="fu">ssh</span> <span class="at">-L</span> 8080:localhost:80 sysadmin@cm5.local</span></code></pre></div>
<p>After running Kubectl and seeing the master node (CM5) and a service
(nginx), success was evident.</p>
<figure>
<img src="{{ site.baseurl }}/devserver/img/kubectl-running.jpeg" alt="KubeCTL" />
<figcaption aria-hidden="true">KubeCTL</figcaption>
</figure>
<h2 id="zero-time"><em>Zero Time</em></h2>
<p>Now it’s time to set up the Zero as a data forwarder. This is incase
the CM5 ever goes offline, and data/projects are sent to each other.
After trying to run apt update/upgrade I ran into issues with
<strong>update-initramfs</strong>, the workaround is to simply go edit
your conf:</p>
<div class="sourceCode" id="cb6"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb6-1"><a href="#cb6-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> nano /etc/initramfs-tools/initramfs.conf</span></code></pre></div>
<p>and update MODULES from dep to most</p>
<div class="sourceCode" id="cb7"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb7-1"><a href="#cb7-1" aria-hidden="true" tabindex="-1"></a><span class="va">MODULES</span><span class="op">=</span>most</span></code></pre></div>
<p>update it:</p>
<div class="sourceCode" id="cb8"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb8-1"><a href="#cb8-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> update-initramfs <span class="at">-u</span></span></code></pre></div>
<p>then reconfig dpkg:</p>
<div class="sourceCode" id="cb9"><pre class="sourceCode sh"><code class="sourceCode bash"><span id="cb9-1"><a href="#cb9-1" aria-hidden="true" tabindex="-1"></a><span class="fu">sudo</span> dpkg <span class="at">--configure</span> <span class="at">-a</span></span></code></pre></div>
<p>All fixed.</p>
<p>Now back to installing the Zero as a data forwarder, this will
forward data from the cm5 to the zero in an outage/downtime and I’ll use
rsync, bash and cron for this.</p>
<p>On the Zero I created a script:</p>
<div class="sourceCode" id="cb10"><pre
class="sourceCode sh"><code class="sourceCode bash"><span id="cb10-1"><a href="#cb10-1" aria-hidden="true" tabindex="-1"></a><span class="co">#!/bin/bash</span></span>
<span id="cb10-2"><a href="#cb10-2" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb10-3"><a href="#cb10-3" aria-hidden="true" tabindex="-1"></a><span class="co"># data_cm5.sh</span></span>
<span id="cb10-4"><a href="#cb10-4" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb10-5"><a href="#cb10-5" aria-hidden="true" tabindex="-1"></a><span class="va">SOURCE_DIR</span><span class="op">=</span><span class="st">&quot;/home/sysadmin/dev&quot;</span>  <span class="co"># CM5&#39;s dir</span></span>
<span id="cb10-6"><a href="#cb10-6" aria-hidden="true" tabindex="-1"></a><span class="va">DESTINATION_DIR</span><span class="op">=</span><span class="st">&quot;/home/sysadmin/dev-cm5&quot;</span>  <span class="co"># Pi Zero&#39;s dir</span></span>
<span id="cb10-7"><a href="#cb10-7" aria-hidden="true" tabindex="-1"></a><span class="va">REMOTE_USER</span><span class="op">=</span><span class="st">&quot;sysadmin&quot;</span>  <span class="co"># Username on CM5</span></span>
<span id="cb10-8"><a href="#cb10-8" aria-hidden="true" tabindex="-1"></a><span class="va">REMOTE_HOST</span><span class="op">=</span><span class="st">&quot;cm5.local&quot;</span>  <span class="co"># IP address of CM5</span></span>
<span id="cb10-9"><a href="#cb10-9" aria-hidden="true" tabindex="-1"></a></span>
<span id="cb10-10"><a href="#cb10-10" aria-hidden="true" tabindex="-1"></a><span class="fu">rsync</span> <span class="at">-avz</span> <span class="va">$REMOTE_USER</span>@<span class="va">$REMOTE_HOST</span>:<span class="va">$SOURCE_DIR</span> <span class="va">$DESTINATION_DIR</span></span></code></pre></div>
<p>then make the script executable with</p>
<div class="sourceCode" id="cb11"><pre
class="sourceCode sh"><code class="sourceCode bash"><span id="cb11-1"><a href="#cb11-1" aria-hidden="true" tabindex="-1"></a><span class="ex">$</span> chmod +x ~/data_cm5.sh</span></code></pre></div>
<p>and enable it to run hourly with cron:</p>
<div class="sourceCode" id="cb12"><pre
class="sourceCode sh"><code class="sourceCode bash"><span id="cb12-1"><a href="#cb12-1" aria-hidden="true" tabindex="-1"></a><span class="fu">crontab</span> <span class="at">-e</span></span>
<span id="cb12-2"><a href="#cb12-2" aria-hidden="true" tabindex="-1"></a><span class="ex">0</span> <span class="pp">*</span> <span class="pp">*</span> <span class="pp">*</span> <span class="pp">*</span> /home/sysadmin/data_cm5.sh</span></code></pre></div>
<p>We need RSA keys here otherwise it will prompt for my password each
time the script runs, which is useless if I’m AFK.</p>
<div class="sourceCode" id="cb13"><pre
class="sourceCode sh"><code class="sourceCode bash"><span id="cb13-1"><a href="#cb13-1" aria-hidden="true" tabindex="-1"></a><span class="fu">ssh-keygen</span> <span class="at">-t</span> rsa <span class="at">-b</span> 2048</span>
<span id="cb13-2"><a href="#cb13-2" aria-hidden="true" tabindex="-1"></a><span class="ex">ssh-copy-id</span> sysadmin@cm5.local</span></code></pre></div>
<p>That should do it. Every hour, anything in the CM5’s /dev folder will
be synced to the Pi Zeros /dev-cm5 folder.</p>
<h2 id="lessons-learned">Lessons Learned</h2>
<p>Throughout this journey, I’ve encountered challenges and discovered
solutions that have expanded my understanding of embedded systems,
server management and aspects of kubernetes I wasn’t aware of, this
education came from making mistakes and running into issues. You don’t
learn anything unless you make mistakes or encounter problems and
overcome them, so this has been a valid lesson!</p>
