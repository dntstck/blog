<!-- Header -->
<link rel="stylesheet" href="../../assets/css/style.css"/>
<div align="center">    
  <a href="../"><img alt="Dev Blog" src="https://img.shields.io/badge/-Developer%20Blog-FE7A16?&logo=git&logoColor=white"></a><br><br></div> 

<div align="center"><a href="../"><img alt="Home" src="https://img.shields.io/badge/-Home-151515?&logo=Arduino&logoColor=C51A4A"></a> <a href="../development"><img alt="Devlogs" src="https://img.shields.io/badge/-Devlogs-151515?&logo=git&logoColor=C51A4A"></a> <a href="../picosystem"><img alt="PicoSystem" src="https://img.shields.io/badge/-PicoSystem-151515?&logo=raspberrypi&logoColor=C51A4A"></a> <a href="../devserver"><img alt="Dev Server" src="https://img.shields.io/badge/-Dev%20Server-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="../rust"><img alt="Rust" src="https://img.shields.io/badge/-Rust-151515?&logo=rust&logoColor=C51A4A"></a> <a href="../gamedev"><img alt="Game Development" src="https://img.shields.io/badge/-Game%20Development-151515?&logo=steam&logoColor=C51A4A"></a> <a href="../misc"><img alt="Misc" src="https://img.shields.io/badge/-Misc-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="../raspberrypi"><img alt="Pi" src="https://img.shields.io/badge/-Raspberry%20Pi-151515?&logo=Raspberry-Pi&logoColor=C51A4A"></a>
<a href="../microcontrollers"><img alt="Microcontrollers" src="https://img.shields.io/badge/-Microcontrollers-151515?&logo=Arduino&logoColor=FE7A16"></a>
<a href="../embedded"><img alt="Embedded" src="https://img.shields.io/badge/-Embedded-151515?&logo=C&logoColor=8a3f8f"></a>
<a href="../webdev"><img alt="Web Dev" src="https://img.shields.io/badge/-Web%20Development-151515?&logo=html5&logoColor=DD4814"></a></div>
<hr>
<div id="blog-post">
<!-- Main --> 




<h1 id="devlog-v8">📝 devlog v15 [ 2025-12-20 ]</h1>

<h4 class="atx" id="setting-up-micro-llm-on-luckfox-pico-max-256mb">setting up micro-llm on luckfox pico max (256mb)</h4>

utilising the luckfox's integrated 1 tops npu to run micro llms
<br>
create dir architecture for cleanliness in opt<br><br>
<code>/opt/llm</code><br><br>
in <code>llm/</code>: <code>/src /bin /models /logs</code><br><br>

using llama.cpp and building from source:<br><br>
<code>sudo git clone https://github.com/ggerganov/llama.cpp cd llama.cpp sudo make LLAMA_NO_ACCELERATE=1</code><br><br>

after successful config; compile with <code>sudo make -j$(nproc)</code><br><br>

after compile move binaries; <code>sudo cp ./bin/* /opt/llm/bin/</code><br><br>

place model(s) in /opt/llm/models, using gpt-mini 124m due to ram constraints<br><br>

test: <code>./llama-cli -m /opt/llm/models/gpt-mini/gpt-mini-q6.gguf -c 160 -n 128 -t 2</code><br><br>

success.<br><br>

create <code>.service</code> file @ <code>/etc/systemd/system/llm.service</code><br><br>

unit file:<br>
<pre><code class="fenced-code-block">[Unit]
Description=Micro LLM
After=network.target

[Service]
ExecStart=/opt/llm/bin/llama-server -m /opt/llm/models/gpt-mini/gpt-mini-q6.gguf --host 0.0.0.0 --port 8080 --threads 1
WorkingDirectory=/opt/llm
Restart=always
User=root

[Install]
WantedBy=multi-user.target </code></pre><br>

reload: <code>sudo systemctl daemon-reload</code><br>

enable: <code>sudo systemctl enable llm.service</code><br>

start: <code>sudo systemctl start llm.service</code><br>

now the luckfox max will run this model as a service on each boot.<br>

model can be accessed via cli, or by accessing <code>&lt;luckfox-ip&gt;:8080</code> in browser.<br>


<h3 class="atx" id="🔍-insights">🔍 insights</h3>

compile will take forever on luckfox - cross compile elsewhere<br>
q2 model loads and runs, as does q6<br>
q3,q4,q5 and q8 refuse to load<br>
small llm models like this output nonsense/garbage, but proof of concept is there<br>
micro llms do run on a cortex a7 with only 256mb of ram, just not very well in regards to coherence. <br>
stats: prompt - 3.4t/s &amp; generation - 1.1t/s<br>




<br>
<!-- Footer -->


<br>
<div align="center"><hr>
  <a href="../"><img alt="Blog" src="https://img.shields.io/badge/-Developer%20Blog-DD4814?style=flat-square&logo=github&logoColor=black"></a> 
  <a href="https://github.com/dntstck"><img alt="GitHub" src="https://img.shields.io/badge/-@dntstck-181717?style=flat-square&logo=GitHub&logoColor=white"></a> 
  <a href="https://www.linkedin.com/in/drudelarosa"><img alt="LinkedIn" src="https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=Linkedin&logoColor=white"></a> 
  <a href="https://orcid.org/0009-0003-6755-7655"><img alt="ORCID" src="https://img.shields.io/badge/-ORCID-A6CE39?style=flat-square&logo=ORCID&logoColor=white"></a> 
  <a href="https://stackoverflow.com/users/28874348/dru-delarosa"><img alt="Stack Overflow" src="https://img.shields.io/badge/-Stack%20Overflow-FE7A16?style=flat-square&logo=Stack-Overflow&logoColor=white"></a>
</div>
