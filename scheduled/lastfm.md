---
title: "lastfm on linux"
date: 2025-01-29T15:40:12Z
publishDate: 2025-02-6T00:00:00Z
tags: [misc]
---

<h1 id="lastfm"><em>Last.fm & Linux with VLC</em></h1>

<p>If like me, you primarily use Linux but want to scrobble music to Last.fm, you've probably hit a brick wall as there is no App for last.fm on Linux. However, I've solved it. If you follow this guide through you will also be able to scrobble music to Last.fm on Linux.</p>

<figure>
<img src="{{ site.baseurl }}/misc/img/vlc.png" alt="VLC" />
<br><sup>VLC</sup>
</figure>

<h1 id="whylastfm"><em>Why Last.fm?</em></h1>

<p>I find tracking my music difficult. I have so many files and different genres that I decided to get back onto last.fm after over a decade of not using it. It's nice to see not much has changed and there's a few new features, like the song you're currently obsessed with.
Anyways, I have faith that last.fm will track my music better, give me recommendations based on my tastes and give me the ability to see what music I listen most to.</p>

<h1 id="lastfm"><em>Non-Native</em></h1>

<p>Last.fm isn't native to Linux, which means there is no official application for it and getting it to work on Linux requires some tweaking. VLC is supposed to support Last.fm natively, however when I tried setting it up in VLCs preferences I received module access errors and 403 bad requests in the message log. No matter what I tried nothing worked so I figured out how to use MPRIS which will scrobble my music in the background and send it to Last.fm, so let's get it set up.</p>

<p>Before we get started, let's get an API key that we will need from Last.fm and all the packages we need to get going.</p>

<h1 id="install"><em>Retrieving API Key &amp; Install</em></h1>

<p> API keys can be generated at <a>last.fm/api</a>, sign in with your details, fill in the boxes (just write test in the app name, it's not important, neither is the description) and click Generate, it will generate an API key &amp; API secret for you. Save this in a text file somewhere you can find it again easily, and copy/paste it without any typos. Now let's go back to our terminal.</p>
<p>We will be using VLC here, it's a great little media player and the only one I've found that has similar settings to AIMP in regards to EQ and Compression, I use both of these when listening to music so it's very important to me the Music player I use has those features. Let's get it installed.</p>

<p><code>sudo apt install vlc</code></p>

<p>Start up VLC, go to Preferences, click ALL Settings on the bottom left then find the CONTROL INTERFACES section and toggle the "Submission of played song" checkbox. All other settings aren't relevant, as MPRIS will handle your username, password and the URL. </p>

<h1 id="python3"><em>Python, pip and Virtual Ennvrionments </em></h1>

<p>Now, let's go back to our terminal as we will need Python and pip:</p>

<p><code>sudo apt install python3 python3-pip</code><p>

<p>If, like me you use Ubuntu 24+, pip will not work for you. This is because APT is the system package manager, not pip. You will simply have to run it in a virtual environment like so:</p>

<code>python3 -m venv myenv</code><br>

<figure>
<img src="{{ site.baseurl }}/misc/img/venv.png" alt="venv" />
<br><sup>python3 virtual environment</sup>
</figure>

<p>This will create a virtual enviroment so that you can still use pip alongside APT. The venv will be stored in your /home directory (/home/username/myenv) and can be executed with:

<code>source myenv/bin/activate</code>

<p>Now, you should see that your terminal prefix has changed and it should say "myenv", this indicates you're now running in your virtual envrionment and can install pip packages without any errors.</p>
<p>Next we will install MPRIS using PIP in your VENV:</p>

<code>pip install lastfm-mpris2-scrobbler</code><br>

<p>Now, leave your virtual environment in the terminal by pressing CTRL+C together, this command kills a running process in the terminal quickly. You can also enter the venv again if you need to with <b>source myenv/bin/activate</b> but we only needed it to install MPRIS.</p>

<h1 id="mpris"><em>Configuring MPRIS using YAML </em></h1>

<p>Sorted. Now let's configure MPRIS with a config YAML. Create this in your home dir in a directory named configs, it will keep all your configs nice and neat and easy to find.</p>

<code>cd ~ </code><br>
<code>mkdir scripts && cd configs</code><br>
<code>touch config.yaml && nano config.yaml</code><br>

<p>Before we edit this config, we need to convert your last.fm password to MD5 so that it can encode your password in a format the API can use. We can do this in the terminal, to generate an MD5 of your password use this command, replacing PASSWORD with your own:</p>

<p><code>echo -n 'PASSWORD' | md5sum </code></p>

<p>Copy the output from the terminal, or save it to copy into your config file that we are going to edit in a moment. Knowing how to do this can very useful, because sometimes you might be working with databases running older versions of MySQL that use password hashing. MySQL8 doesn't use it anymore for safety concerns but it's still useful to know how to MD5 a string.</p>
<p>Note how I link commands with the AND ( &amp;&amp; ) operator, this means if the first command is successful, it will execute the next command. Very useful little tip there.</p>
<p>I'll use nano to edit the config, as I appreciate most people can't get on with Vim. Opening the file you will see that YAML is fairly easy to work with and your script should resemble mine:</p>

<figure>
<img src="{{ site.baseurl }}/misc/img/scrobbleconfig.png" alt="Config YAML" />
<br><sup>YAML config</sup>
</figure>

<p>Save the config as scrobble.yaml in your /configs directory that we created earlier.</p>
<p>Now we can try running the scrobbler, with the config we created earlier. Replace USERNAME with your own username that you use on your machine.</p>

<code>lastfm-mpris2-scrobbler -c /home/USERNAME/configs/scrobble</code><br>

<p>It should run, and say that it's not yet time to scrobble or that it can't locate a media player. Try loading up VLC and playing a song to see if it scrobbles, it should work perfectly and your latest listened track should be viewable on Last.fm after it scrobbles, which is usually 50% of the tracks overall playtime or 4 minutes if the track is long.</p>


<h1 id="scripting"><em>Scripting with Bash</em></h1>

<p>Now, let's make this execute on startup, saving you from going into a venv on every boot and triggering the script. Let's create another directory, called scripts, where you will keep not only this script but others you may create in the future. Keeping configs and scripts in directories this way saves time and you know where they all are, plus they can be backed up easily.</p>
<p>In your terminal, leave your venv with CTRL+C if you're still in it, then:</p>

<code>cd ~ </code><br>
<code>mkdir scripts && cd scripts</code><br>
<code>touch scrobble.sh</code>

<p> note the ~ command here after cd (change dir), the Tilde (~) will send you straight to your /home folder in Linux.</p>
<p>Now lets write the bash script to enable scrobbling on boot:</p>
<p>
<code>#!/bin/bash</code></p>
<p><code>source /home/sysadmin/myenv/bin/activate</p></code>
<p><code>exec lastfm-mpris2-scrobbler -c /home/sysadmin/configs/scrobble.yaml </code></p>

<p>A lovely, little bash script there. I love working with bash scripts!</p>

<figure>
<img src="{{ site.baseurl }}/misc/img/scrobblesh.png" alt="scrobble.sh" />
<br><sup>scrobble.sh</sup>
</figure>

<h1 id="service"><em>Setting as a System Service</em></h1>

<p>Now with that sorted, we can set up a system service so that this bash script executes when the system boots. Don't fret, this is quite easy to do. Let's get it done:</p>
<p>First we need to locate our system daemon dir, it's here:</p>

<p><code>cd ~/.config/systemd/user</code></p>

<p>Inside this dir, create a file named "scrobbler.service" and open it with nano:</p>

<p><code>touch scrobbler.service && nano scrobbler.service</code></p>

<p>then, we edit this file to tell the system to launch this service on boot:</p>

<figure>
<img src="{{ site.baseurl }}/misc/img/scrobbleservice.png" alt="service" />
<br><sup>scrobble.service</sup>
</figure>

<p>Done! Now let's enable the service and check it works:<p>

<code> systemctl --user enable scrobbler.service</code><p>
<code> systemctl --user start scrobbler.service</code><p>
<code> systemctl --user status scrobbler.service</code><p>

<p>You should see output that fills the terminal, look for Loaded: loaded (/home/yourusername/.config/systemd/user/scrobbler.service), if you see it that means it's up and running! If you see errors, you have typos in your .service file. fix the typos and reload the daemon with:</p>

<p><code> systemctl --user daemon</code><p>

<p>Then try starting it again and check the status, if you've done everything correctly your music will now scrobble in the background automatically, on Linux too! Neat.</p>

<figure>
<img src="{{ site.baseurl }}/misc/img/servicestatus.png" alt="service status" />
<br><sup>service status</sup>
</figure>

<p> If you notice any errors in this tutorial, get stuck, or can't figure it out please message me on GitHub, StackOverflow or LinkedIn, my profiles can be found at the bottom of this page.</p>
<p>I hope you got it working and can now scrobble music on your Linux machine!</p>
<p>Until next time, 

Dru</p>

