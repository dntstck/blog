---
title: "devlog-v8"
date: 2025-12-27T23:40:59Z
publishDate: 2025-12-27T00:00:00Z
tags: [development]
---

<h1 id="devlog-v8">devlog-v8</h1>

<p>Content</p>

<h1 id="devlog-v8">📝 devlog v15 [ 2025-12-20 ]</h1>

<h4 class="atx" id="setting-up-micro-llm-on-luckfox-pico-max-256mb">setting up micro-llm on luckfox pico max (256mb)</h4>
<ul>
<li><p>utilising the luckfox's integrated 1 tops npu to run micro llms</p>
</li>
<li><p>create dir architecture for cleanliness in opt</p>
<p><code>/opt/llm</code></p>
<p>in <code>llm</code>: <code>/src /bin /models /logs</code></p>
</li>
<li><p>using llama.cpp and building from source in <code>/opt/llm/src</code>:</p>
<p><code>sudo git clone https://github.com/ggerganov/llama.cpp cd llama.cpp sudo make LLAMA_NO_ACCELERATE=1</code></p>
</li>
<li><p>after successful config; compile with <code>sudo make -j$(nproc)</code></p>
</li>
<li><p>after compile move binaries; <code>sudo cp ./bin/* /opt/llm/bin/</code></p>
</li>
<li><p>place model(s) in /opt/llm/models, using gpt-mini 124m due to ram constraints</p>
</li>
<li><p>test: <code>./llama-cli -m /opt/llm/models/gpt-mini/gpt-mini-q6.gguf -c 160 -n 128 -t 2</code></p>
</li>
<li><p>success.</p>
</li>
<li><p>create <code>.service</code> file @ <code>/etc/systemd/system/llm.service</code></p>
</li>
<li><p>unit file:</p>
</li>
</ul>
<pre><code class="fenced-code-block">[Unit]
Description=Micro LLM
After=network.target

[Service]
ExecStart=/opt/llm/bin/llama-server -m /opt/llm/models/gpt-mini/gpt-mini-q6.gguf --host 0.0.0.0 --port 8080 --threads 1
WorkingDirectory=/opt/llm
Restart=always
User=root

[Install]
WantedBy=multi-user.target </code></pre>
<ul>
<li><p>reload: <code>sudo systemctl daemon-reload</code></p>
</li>
<li><p>enable: <code>sudo systemctl enable llm.service</code></p>
</li>
<li><p>start: <code>sudo systemctl start llm.service</code></p>
</li>
<li><p>now the luckfox max will run this model as a service on each boot.</p>
</li>
<li><p>model can be accessed via cli, or by accessing <code>&lt;luckfox-ip&gt;:8080</code> in browser.</p>
</li>
</ul>
<h3 class="atx" id="🔍-insights">🔍 insights</h3>
<ul>
<li>compile will take forever on luckfox - cross compile elsewhere</li>
<li>q2 model loads and runs, as does q6</li>
<li>q3,q4,q5 and q8 refuse to load</li>
<li>small llm models like this output nonsense/garbage, but proof of concept is there</li>
<li>prompt: 3.4t/s &amp; generation: 1.1t/s</li>
</ul>
