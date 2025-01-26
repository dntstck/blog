---
title: "build-vim"
date: 2025-01-16T23:04:38Z
publishDate: 2025-01-17T00:00:00Z
tags: [misc]
---

<h1><em>Building Vim from Source</em></h1>

<p>Today, we are going to be walking through building Vim from source, as well as a nice few bonus features at the end such as configuring your .vimrc, installing YouCompleteMe and even setting Vim up as a (nearly) full fledged IDE. If you're interested in building Vim from source, want to try developing with Vim, are interested in C development and want to try Vim, or are simply just curious about it then please follow along as we delve into this fantastic text editor.</p>

<h2><em>But why? and why Vim? isn't it just a text editor?</em></h2>

<p>Aha, you say. Vim is a text editor! Well yes, that is true. However it's an extremely, powerful text editor that has a large community of users, who have developed plugins that improve it's functionality. Vim itself has a whole host of features such as syntax highlighting, support for mutiple languages, buffers and so much more that I won't list here without going off on a tangent.</p>
<br>
<p>Vim has a reputation for being notoriously hard to learn and to be fair sometimes it can seem rather alien, such as using the hjkl keys to navigate, or having more than one mode such as Normal, Insert and Visual. However once you are accustomed to it's ways your productivity increases tenfold. If you are new to Vim, I suggest searching for vimtutor, or reading a few books on the subject because today we are simply going to be walking through building it from source, customising the .vimrc and setting up a plugin manager. While this is not a tutorial for Vim, you could get away with using it for now if you aren't accustomed to it by simply learning that Vim will only insert text when you push "i" in Normal Mode, to escape this mode (Insert) you press Escape. You can also run commands in Normal mode by typing ":", :w saves your file, :w! forces an overwrite, :q will quit back to console, :q! will force quit with or without saving and :wq! forces a write, then quits back to console. This very brief tutorial should suffice for now but I implore you to learn it properly.

Now, let's get to the whys: Building it from source is highly customisable, including language support that is not usually available for example Ruby, it will be built for your specific system, such as Ubuntu and it's also a fantastic learning experience if you have never compiled anything before.