---
title: "devlog-v2"
date: 2025-12-07T03:44:08Z
publishDate: 2025-12-07T00:00:00Z
tags: [development]
---

<h1 id="devlog-v2">⚙️ devlog v2 [ 2025-12-01 ]</h1>

<p>- prep and install packages for mcu development on debian
- rp2040, rp2040zero, rp2040plus, esp32-s3, esp32-c6, esp-wroom-32
- install toolchains for esp32
- install crates for esp support in rust
- add rustup to path, as using zsh.</p>

<h1 id="devlog-v2">🔍 insights</h1>
<p>staged c dev packages: build-essential, cmake, git, ninja, pkg-config, flex, bison, gdb-multiarch, openocd, gcc-arm-none-eabi, binutils, wget/curl/unzip.

installed rust toolchain via rustup + cargo, added targets: `thumbv6m-none-eabi` (rp2040), `riscv32imc-unknown-none-elf` (esp32-C6).

Installed xtensa toolchain for esp32-s3/wroom32, linked with `espup` for rust builds

luckfox max runs rust natively as a linux sbc.

workflow now covers rp2040, esp32 (s3/c6/wroom32) & luckfox max</p>
