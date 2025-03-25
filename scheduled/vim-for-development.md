---
title: "vim-for-development"
date: 2025-03-21T12:58:06Z
publishDate: 2025-03-22T00:00:00Z
tags: [development]
---

<h1 id="vim-for-development"><em>Vim for Development</em></h1>

<p>Hello everyone, I hope you're well and life is treating you kindly. If it isn't, let's distract you from it as today I'll be going through how I set up vim for development, including building it from source, adding a plugin manager and setting up our first plugin; YouCompleteMe which I will refer to as YCM from now on.</p>

<h1 id="vim-for-development"><em>Why Vim?</em></h1>
<p>Vim is extremely powerful and highly customizable. Once you learn how to use it effectively, you will be surprised at how much your productivity increases. Vim's modal editing allows you to manipulate text efficiently and it's keyboard centric focus means you no longer waste time with the mouse... it's surprising how much a mouse can slow you down!
Coupled with it's light memory footprint (meaning older machines and even embedded systems have no issues running it), it's endless, endless customization possibilities, transferable skills (such as the commands and keyboard navigation) and simply the fact it's a timeless piece of software with a massive community following makes it a strong candidate for daily use.</p>

<h1 id="vim-for-development"><em>Why not Vim?</em></h1>

<p>Vim is great; but there are some cons to vim:
<ul>
<li>Can be tricky to learn</li>
<li>is <em>so</em> customizable it's easy to get "lost"</li>
<li>Minimal features on install</li>
<li>Plugin management is tricky at first</li>
<li>Doesn't hold your hand</li>
</ul>
These are the only downsides I've found, vim has a steep learning curve and is so customizable that it's easy to get lost and confused trying to customize it. It's not an out-of-the-box editor so it needs customizing to suit your needs, the UI is dated (not really a con in my eyes) and vim is notoriously ruthless; it does not hold your hand. You have to invest time into it to get the most out of it. However luckily for us, after reading this blog post you should only need to invest time in it. Adding features will be covered in this post and we are even going to touch on plugin management using vundle, by the end you will have a fully fledged custom vim setup that is prepped and ready to add more plugins to.</p>

<h1 id="vim-for-development"><em>Building Vim from Source</em></h1>

<p>We will start by building Vim from source, this gives us a wide variety of features to choose from and you don't work with a language that I do, you are welcome to remove the support for it. </p>

<p>Let's begin by checking if vim is installed on our system with --version : </p>
<p><code>vim --version </code></p>

<p>If you don't see any output, vim is not installed. If you do see output however, it will lack the support for languages that we may need.</a>

<p>Now let's install some packages that might be required:</p>

<p><code>sudo apt install git libncurses5-dev libgtk2.0-dev libatk1.0-dev libcairo2-dev libx11-dev libxpm-dev libxt-dev python3-dev python3-setuptools ruby-dev lua5.2 liblua5.2-dev libperl-dev git cmake clangd-19 checkinstall clang-tools-19 libclang-dev llvm clang-tools clang nodejs openjdk-17-jdk openjdk-17-jre npm</code></p>

<p>because we will need to clone the source</p>
<p><code>git clone https://github.com/vim/vim.git</code></p>

<p>cd into that dir..</p>
<p><code>cd vim</code></p>

<p>here, we will pause and go over configuring features.</p>

<p><code>./configure --with-features=huge --enable-multibyte --enable-rubyinterp=yes --enable-python3interp=yes --with-python3-config-dir=/usr/lib/python3.12/config-3.12-x86_64-linux-gnu/ --enable-perlinterp=yes --enable-luainterp=yes --enable-gui=gtk3 --enable-cscope  --prefix=/usr/local</code></p>

<p>these features are what I personally enable in vim for development. Feel free to remove any language supports you do not use. You may also need to tinker with "with-python3-config-dir" to match your systems Python3 directory.</p>

<p>For a bit of fun, you can edit who compiled it by adding on: </p>
<code>--with-compiledby="yourname" </code>
<p>to that command. </p>

<p>then run make:</p>
<p><code>make VIMRUNTIMEDIR=/usr/local/share/vim/vim91</code></p>
<p>and install:</p>
<p><code>sudo make install</code></p>

<p>after a moment, you should be able to run vim --version and view the output; which should now have a plus symbol next to python, ruby lua and perl.</p>

<h1 id="vim-for-development"><em>YouCompleteMe</em></h1>

<p>With vim up and running, we can start installing YouCompleteMe; a code completion engine that will help you code. YCM requires ctags. let's install it:</p>

<p><code>git clone https://github.com/universal-ctags/ctags.git</code></p>

<p><code>cd ctags</code></p>
<p><code>./autogen.sh</p></code>
<p><code>./configure</p></code>
<p><code>make</p></code>
<p><code>sudo make install</p></code>

<p>perfect, with this installed we can start installing YCM by editing our .vimrc in our home folder. </p>
<p><code>touch .vimrc && vim .vimrc</code></p>

<p>Now we're in vim. now let's start by adding vundle, add these four lines to the top of your .vimrc :</p>

<p><code>
set rtp+=~/.vim/bundle/Vundle.vim</code></p>

<p><code>call vundle#begin()</code></p>

<p><code>Plugin 'gmarik/Vundle.vim'</code></p>
<p><code>Plugin 'ycm-core/YouCompleteMe'</code></p>

<p>save the file, exit vim:</p>
<p><code>:wq!</code></p>
<p>:w saves your file, :q quits and ! forces close, :wq! will force save then force close.</p>
<p> then re enter vim and type:</p>
<p><code>:PluginInstall</code></p>
<p>hit enter, and it should install YCM as a plugin. Now you need to exit vim, locate the YCM folder and install the server:</p>
<p><code>cd ~</code></p>
<p><code>cd .vim/bundle/YouCompleteMe</code></p>

<p>now run the script:</p>
<p><code>python install.py --all</code></p>

<p>the -all tag will install support for most languages, if you come across any errors here, simply install the support for the language that's missing. for me it was Go, so I had to sudo apt install golang to solve it.</p>

<h1 id="vim-for-development"><em>.vimrc</em></h1>

<p>What we have done so far is no mean feat and now we can start adding plugins, I have set up a .vimrc already for you to install as I appreciate that we've done a lot of typing so far. the .vimrc file is your "main base" for configuring vim, any keybindings, plugins or behaviours you want vim to do will be written in here and there is a lot to go over in it, so I have attached a sample .vimrc you can <a href="/development/vimrc">download</a> that I have pre configured, it contains vundle, YCM, a theme and a few simple plugins to get you started.<br/>
 Simply copy it to your home folder, open vim and run :PluginInstall, and it will install. F2 and F3 will toggle the tree and tagbar. Feel free to remap them and feel free to look through the vimrc itself, you'll be looking at it a lot until you get your vim setup polished. Remember, if you add any plugins to the vimrc you will need to execute :PluginInstall to install them. Any other settings such as keybindings or other vim settings are applied automatically on boot. </p>

<h1 id="vim-for-development"><em>Going forward</em></h1>
<p>Well, that's us done! Vim is built from source, YCM is installed, we have a nice theme, a few keybindings have been remapped and a couple of plugins to get started. You're probably wondering where to go from here and we haven't really touched the surface with vim; all we have done is built it from source and installed a few plugins. There is so much I haven't covered and can't without us going down several rabbit holes. However, we have got a good basis here and honestly, the best way to go forward is to boot up vim and start coding.

Until next time, <br/>
Dru x </p>


