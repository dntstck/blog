---
title: "devlog-v6"
date: 2025-12-07T03:44:20Z
publishDate: 2025-12-07T00:00:00Z
tags: [development]
---

<h1 id="devlog-v6">⚙️ devlog v6 [ 2025-12-07 ]</h1>

<p>- concern arising from space available on microcluster nodes <br>
- native emmc has ~1.81gb space free on both nodes, most likely logs, crash dumps, apt cache and unused/stopped containers <br>
- decided to utilise bash & cron by writing a simple script that compresses old logs, cleans apt cache, removes any build artifacts, old kernels, containers and temp files<br>
- this will run everyday at midnight on both nodes.<br></p>

<h1 id="devlog-v6">🔍 insights</h1>
<p>- realised my crontab wasnt working; remembered i did not run crontab -e as sudo/root, which means it only ran for the current user. some of the script commands require root priveleges therefore script would fail.<br><br>
  
- these nodes are at the limit i can push already for running a small microcluster; which is my reasoning for using external nvme drives via usb. ssds would hit the same usb 2.0 bottleneck and have a smaller form factor; using nvme drives also means i can utilise some coolers i have lying around, which will keep the drives at a very cool temperature.<br><br>
  
- by removing logs and unused artifacts i freed up over a gb of space and careful use will keep the cluster nodes at around 2.80gb free; which is viable for my purposes:<br><br>
  
  only build rust projects on the core node. being a cm5 it will compile them faster with its extra ram and native nvme speeds.<br><br>
  
  c projects can be built on both nodes, as gcc uses much less space, mcu code could also be compiled and flashed here as picotool uses minimal space also<br><br>
  
  any large projects, code or even containers could be stored on the external nvme drives, keeping the nodes emmc at a useable 2.80gb<br></p>



