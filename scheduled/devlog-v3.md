---
title: "devlog-v3"
date: 2025-12-07T03:44:11Z
publishDate: 2025-12-07T00:00:00Z
tags: [development]
---

<h1 id="devlog-v3">⚙️ devlog v3 [ 2025-12-02 ]</h1>

<p>- installing debian on a dell vostro a100 x64 machine, for a low powered (under 25w) NAS <br>
- staged sudo + passwd for clean privilege escalation <br>
- xfce4 + lightdm layered, surprisingly snappy on SSD <br>
- pci gigabit nic installed, static ip locked in via systemd networking <br>
- external drive detected (600gb + 300gb), planning resize + cleanup before samba shares <br>
- zsh + oh-my-zsh + powerlevel10k + jetbrains mono nerd font staged for shell expressiveness <br>
- btop tested, smooth even on legacy hardware<br></p>

<h1 id="devlog-v3">🔍 insights</h1>
<p>- netinst failed, hangs at ISOLINUX; meaning bootloader cant find kernel<br>
- switched USB drives to sandisk, attempted again<br>
- used DVD iso in place of netinst<br>
- switched to text based install, graphical shung at 97%<br>
- text based install hung again at 97%, reinstall with basic sysutils & ssh only.<br>
- install succeeeded. proceeded to install xfce, lightdm.<br>
- xfce responsiveness exceeded expectations on legacy hardware<br>

