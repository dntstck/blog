<!-- Header -->
<link rel="stylesheet" href="../../assets/css/style.css"/>
<div align="center">    
  <a href="../"><img alt="Dev Blog" src="https://img.shields.io/badge/-Developer%20Blog-FE7A16?&logo=git&logoColor=white"></a><br><br></div> 

<div align="center"><a href="../"><img alt="Home" src="https://img.shields.io/badge/-Home-151515?&logo=Arduino&logoColor=C51A4A"></a> <a href="./development"><img alt="Pi" src="https://img.shields.io/badge/-Development-151515?&logo=git&logoColor=C51A4A"></a> <a href="./picosystem"><img alt="PicoSystem" src="https://img.shields.io/badge/-PicoSystem-151515?&logo=raspberrypi&logoColor=C51A4A"></a> <a href="./devserver"><img alt="Dev Server" src="https://img.shields.io/badge/-Dev%20Server-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="./"><img alt="Rust" src="https://img.shields.io/badge/-Rust-151515?&logo=rust&logoColor=C51A4A"></a> <a href="./gamedev"><img alt="Game Development" src="https://img.shields.io/badge/-Game%20Development-151515?&logo=steam&logoColor=C51A4A"></a> <a href="./misc"><img alt="Misc" src="https://img.shields.io/badge/-Misc-151515?&logo=Ubuntu&logoColor=C51A4A"></a> <a href="./raspberrypi"><img alt="Pi" src="https://img.shields.io/badge/-Raspberry%20Pi-151515?&logo=Raspberry-Pi&logoColor=C51A4A"></a>
<a href="./microcontrollers"><img alt="Microcontrollers" src="https://img.shields.io/badge/-Microcontrollers-151515?&logo=Arduino&logoColor=FE7A16"></a>
<a href="./embedded"><img alt="Embedded" src="https://img.shields.io/badge/-Embedded-151515?&logo=C&logoColor=8a3f8f"></a>
<a href="./webdev"><img alt="Web Dev" src="https://img.shields.io/badge/-Web%20Development-151515?&logo=html5&logoColor=DD4814"></a></div>
<hr>
<div id="blog-post">
<!-- Main --> 




<h1 id="vim-and-rust"><em>Vim & Rust</em></h1>

<p>Sounds like the title of a thrash metal album doesn't it?</p>
<p>Well this post won't melt your speakers, but it may make your editor scream with joy as I'm going to go through how I have set up vim for development with rust! Previously I have walked through building vim entirely from source, installing a plugin manager alongside YouCompleteMe and tweaking the vimrc with some keybindings. Today's post will build on that, where we enable rust language support inside YCM, adding more plugins and tweaking the vimrc further.</p>


<h1 id="rust-and-ycm"><em>Rust & YCM</em></h1>
<p>You may already know that YCM natively supports C, C++, Python, Typescript, Java etc. But what you might not know is that it also supports Rust! YCM is a language server protocol client; thus it enables another server to communicate to it, unlocking support for intelligent code completion, syntax checking, diagnostics and error checking which is fantastic for us as we can harness the power of rust-analyzer inside of vim. This powers-up vim further to be a fair combatant in the world of IDE's in 2025.</p>

<figure>
<img src="{{ site.baseurl }}/rust/img/vim-ycm1.png" alt="YCM in action" style="max-width: 600px; height: auto;" />
<br><sup>YCM in action, working with rust-analyzer. In Vim's normal mode, highlighting keywords in the syntax will bring up detailed popups. I keep them on, but they can be disabled in the vimrc as seen below. I'm currently working through a Rust game development book; if you are interested about the code itself.</sup>
</figure>

<h1 id="adding-ycm-support"><em>Adding support for YCM</em></h1>
<p>If you followed the previous blog post you will be ready to go with installing the support needed, which is extremely easy to do. If you didn't follow the previous post, I strongly suggest you do so because setting up YCM is no mean feat and the previous post will cover all prerequisites. Then; we simply need to tell YCM where to look for the rust analyzer and how can we do that? the vimrc. You betcha! simply add these lines to it, replacing your-username with your systems account username.</p>

<code>let g:ycm_language_server = [
  \ {
  \   'name': 'rust',
  \   'cmdline': [ '/home/your-username/.cargo/bin/rust-analyzer' ],
  \   'filetypes': [ 'rust' ],
  \ }
\ ]</code>


<figure>
<img src="{{ site.baseurl }}/rust/img/vimrc-ycm.png" alt="vimrc ycm settings" style="max-width: 600px; height: auto;" />
<br><sup>A snippet from my personal vimrc, showing the config I use for YCM.  Note the setting for detailed dialog popups, they can be disabled by setting the value to 0.</sup>
</figure>

<p>After editing, cd into a rust project, open the src/main.rs in vim and rust-analyzer will be ready to go. write some simple code, such as a function block and watch the magic unfold! You can usually force an auto-completion with CTRL+SPACE or CTRL+N. These keybinds can be remapped; as we have already found out through the power of vimrc. </p>

<h1 id="enabling-clippy"><em>Enabling Clippy</em></h1>
<p>Alongside rust-analzer and YCM, if you're a "Dark Souls" coder and love being punished, you can enable Clippy in your projects. Clippy will monitor your code and ~gently~ remind you when you are falling foul of code guidelines. Punish yourself further and enable pedantic mode if you really want Clippy to be brutal with your code, it's a great way of ensuring your projects are up to code guidelines and your coding style is not picking up bad habits. You can either run clippy directly from your projects directory with <code>cargo clippy</code>, or add this line to the top of your main.rs to enable Clippy:</p>
<p><code>#![warn(clippy::all)]</code></p>
<p>To enable pedantic mode, use this:</p>
<p><code>#![warn(clippy::all, clippy::pedantic)]</code></p>
<p>You might get frustrated at using it at first as it is pretty brutal regarding rust code, but let it help you. Clippy is a valuable tool for teaching you how to write great code.</p>

<figure>
<img src="{{ site.baseurl }}/rust/img/vim-ycm3.png" alt="YCM in action" style="max-width: 600px; height: auto;" />
<br><sup>YCM in action, showing a detailed description of "match"</sup>
</figure>


<h1 id="rust-plugins"><em>Rust Plugins</em></h1>
<p>There are a few rust plugins available for vim:</p>


<p><b>rust-lang/rust.vim</b> - Rust Developer Essential. This plugin adds essential features: syntax highlighting, code formatting through rustfmt, and integration with the Rust Language Server.</p>
<p><b>timonv/vim-cargo</b> - Adds cargo support directly to vim, enabing project building, testing and running straight from the editor. Typing <code>:CargoBuild</code>, <code>:CargoTest </code> or <code>:CargoRun</code> will build, test or run your project directly from vim's command mode.</p>
<p><b>arzg/vim-rust-syntax-ext</b> - This nifty little plugin enhances Vim's Rust syntax abilities, providing extra syntax rules and refinements. Makes Rust code more readable inside of vim.</p>
<p>Add these into your vimrc, run :PluginInstall (you should be an expert at this by now!) and enjoy the power these plugins add to your vim setup.

<h1 id="extending-it-further"><em>Extending it further</em></h1>
<p>We can extend our vim setup further with git integration, absolutely essential these days and luckily for us, <b>tpope/vim-fugitive</b> is perfect for this. Not only supporting git, but github also enabling you to manage your repo's all in the comfort of vim's command mode:<br/>
 <br/>
<b>:G status</b> - View the current status of your repository.<br/>
<b>:G diff</b> - Compare changes in the current file with the last commit.<br/>
<b>:G commit</b> - Stage changes and commit them, all from within Vim.<br/>
<b>:G push & :G pull</b> - Push and pull changes to/from your remote repository.<br/>
<b>:G log</b> - View git log<br/>
<b>:GBrowse</b> - opens the current file directly in your GH repo via your web browser. Extremely useful for sharing code to a friend or team-mate.
<br/><br/>
There are more commands, if you're interested in diving further check out <a href="https://github.com/tpope/vim-fugitive">tpope's fugitive repository</a>.

Going even further than that; we can even install <b>airblade/vim-gitgutter</b> to monitor files in real-time without running git diff. This enables you to check for modifications in your code, such as added or removed lines, all within vim.</p>

<figure>
<img src="{{ site.baseurl }}/rust/img/vim-git2.png" alt="Vim, Rust & git" style="max-width: 600px; height: auto;" />
<br><sup>fugitive at work, showing a commit made entirely inside Vim with <code>:G commit -m "inital commit"</code></sup>
</figure>

<p>You should have a <em>pretty decent</em> vim setup by now. We can extend it <em>even</em> further with themes (you could even create your own), however themes are a very personal matter and you will have to find the one that "speaks" to you. The same applies to <b>keybindings</b>, I could go on at length about keybindings, but these are also a personal thing and aren't generic. For instance I have "jj" remapped in vim to "esc" to escape normal mode without my fingers over-reaching and leaving the modal/vim keys (sdfg + hjkl), but I also have other keybindings that won't work unless you have a keyboard that has layers. You should be a .vimrc expert by now and remapping keys inside the vimrc shouldn't be a difficult task for you. </p>

<figure>
<img src="{{ site.baseurl }}/rust/img/vim-ycm4.png" alt="Vim, Rust & YCM" style="max-width: 600px; height: auto;" />
<br><sup>Vim, Rust & YCM working together in harmony. Tabbed workspaces, NERDTree and TagBar, showing the beauty of ayu-mirage theme and vim-rust-syntax-ext's extra syntax capabilities.</sup>
</figure>

<h1 id="final-thoughts"><em>Final thoughts</em></h1>
<p>Well that's it. Vim & Rust. Let's quickly cover the features we've added:<br/><br/>
<b>YCM & rust-analyzer</b> - intelligent code completion<br/>
<b>Clippy</b> - code syntax/guideline helper<br/>
<b>Rust Plugins</b> - Essential plugins for Rust <br/>
<b>fugitive & gitgutter</b> - git integration and real-time git diff<br/><br/>

 That's a pretty awesome Vim setup for Rust if you ask me. I hope this post was helpful and enabled you to install support for Rust inside of Vim. Now get coding!<br/><br/>
Catch you next time, <br/> Dru x </p>


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
