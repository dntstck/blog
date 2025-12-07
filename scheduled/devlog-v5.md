---
title: "devlog-v5"
date: 2025-12-07T03:44:17Z
publishDate: 2025-12-07T00:00:00Z
tags: [development]
---

<h1 id="devlog-v5">📝 session notes</h1>

<p>- restoring microcluster to LAN <br>
- microcluster - cm5 4gb ram 128gb nvme (native) + wyse 3040 + wyse 3040<br>
- all attempts connecting to main network failed<br>
- constant no route to host errors<br>
- solved by power cycling office switch, powering down all nodes and poe switch<br>
- set static ip's with routes to router ip (192.168.0.1)<br>
- powering on office switch, cm5, then poe switch which powers the wyse 3040 nodes & luckfox sbc.<br>
- reserved addresses in router<br>
- grafana works perfectly over wifi, using laptop.<br>
- kept cron job that pings via bash script to all nodes to prevent dhcp drift<br></p>

<h1 id="devlog-v5">🔍 insights</h1>
<p>- wyse nodes have minimal on-board storage solved by using usb to nvme adapters and external nvme drives (128gb)<br>
- no difference between using sata hdd/sdd, as bottlenecked by usb 2.0 speeds <br> 
- nvme has a small form factor and fits better on the microcluster.<br>
- i believe the issue stems from stale arp tables on the office switch.<br>
- all solved and can now manage microcluster from any device on the network.<br></p>
