---
title: "devlog-v7"
date: 2025-12-08T04:26:08Z
publishDate: 2025-12-08T00:00:00Z
tags: [development]
---

<h2 class="atx" id="📝-devlog-v7--2025-12-08-">📝 devlog v7 [ 2025-12-08 ]</h2>
<ul>
<li>installing btop on luckfox max to monitor constraints</li>
<li><code>sudo apt install g++ cmake git git clone https://github.com/aristocratos/btop.git cd btop &amp;&amp; git checkout v1.2.13 make sudo make install</code></li>
<li>build failed - requires c++23. too heavy for this sbc</li>
<li>reverted to version v.1.2.13 - <code>git checkout v1.2.13</code></li>
</ul>

<h3 class="atx" id="🔍-insights">🔍 insights</h3>
<ul>
<li><p>luckfox pico max :</p>
<table>
<thead>
<tr>
<th><strong>SoC</strong></th>
<th>Rockchip RV1106 – IPC visual processing SoC</th>
</tr>
</thead>
<tbody><tr>
<td><strong>CPU</strong></td>
<td>ARM Cortex‑A7, single‑core, 32‑bit, up to 1.2 GHz</td>
</tr>
<tr>
<td><strong>NPU</strong></td>
<td>1 TOPS, supports INT4/INT8/INT16 mixed operations</td>
</tr>
<tr>
<td><strong>RAM</strong></td>
<td>256 MB DDR3L (integrated)</td>
</tr>
<tr>
<td><strong>Flash Storage</strong></td>
<td>256 MB SPI flash</td>
</tr>
<tr>
<td><strong>Expandable Storage</strong></td>
<td>microSD slot (bootable)</td>
</tr>
<tr>
<td><strong>USB</strong></td>
<td>1× USB host, 1× USB OTG</td>
</tr>
<tr>
<td><strong>Ethernet</strong></td>
<td>10/100 Mbps</td>
</tr>
<tr>
<td><strong>Video ISP</strong></td>
<td>4M @ 30fps ISP with HDR, 3A, 3DNR, gamma correction</td>
</tr>
<tr>
<td><strong>OS Support</strong></td>
<td>Buildroot and Ubuntu 22.04</td>
</tr>
<tr>
<td><strong>Other Features</strong></td>
<td>Integrated audio codec, MAC PHY, hardware ISP accelerators</td>
</tr>
</tbody></table>
</li>
<li><p>compile speeds for btop:</p>
</li>
<li><p><code>Compiling btop.cpp 10% -&gt; obj/btop.o (1.8MiB) (01m:08s)Compiling btop_config.cpp 20% -&gt; obj/btop_config.o (1.4MiB) (55s) 
Compiling btop_draw.cpp 30% -&gt; obj/btop_draw.o (2.3MiB) (01m:16s)
Compiling btop_input.cpp 40% -&gt; obj/btop_input.o (1.4MiB) (55s) 
Compiling btop_menu.cpp 50% -&gt; obj/btop_menu.o (2.0MiB) (01m:06s) 
Compiling btop_shared.cpp 60% -&gt; obj/btop_shared.o (1.8MiB) (01m:04s) Compiling btop_theme.cpp 70% -&gt; obj/btop_theme.o (1.4MiB) (53s)
Compiling btop_tools.cpp 80% -&gt; obj/btop_tools.o (1.4MiB) (59s) 
Compiling linux/btop_collect.cpp 90% -&gt; obj/linux/btop_collect.o (3.1MiB) (01m:30s)

Linking and optimizing binary... 100% -&gt; bin/btop (1004KiB) (07m:31s)

Build complete in (17m:25s)</code></p>
</li>
</ul>


