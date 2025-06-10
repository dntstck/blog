---
title: "Automating"
date: 2025-06-10T00:32:51Z
publishDate: 2025-06-11T00:00:00Z
tags: [devserver]
---

<h1 id="Automating"><em>Dev Server Automation</em></h1>

<p>hi all, tis been a while. recently i've been furthering my rust knowledge and developing a vim plugin for rust crate management, Virgo. you can check it out <a href="https://github.com/dntstck/virgo">here</a>. this project has taken up a lot of my time and alas, i have neglected my blog. so today its time to end that neglect and dive in to what i have been working on over the last week and that is using the power of my Compute Module 5 Dev Server to optimize said project.</p>


<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver.jpeg" alt="CM5 Dev Server" />
<br><sup>My CM5 Dev Server, housed in a generic abs enclosure.</sup>
</figure>

<h1 id="Automating"><em>Compute Module 5</em></h1>
<p>the subject in question. this is a 4gb cm5 hooked up to the official io board with a 2280 128gb nvme drive which is connected to my local network over ethernet. it's on 24/7, tinkering away, mostly backing up data and hosting my local git server but it also has the power to automate builds and after realizing a rookie mistake (more later) i decided to automate the now lengthy build process with bash, cron and email notifications using smtp.</p>


<h1 id="Automating"><em>Rookie error</em></h1>
<p>we all make them. mine was the sudden realization i was only building and releasing for x86_64, lol. duh. other architectures are available.
so this now required building openssl from source for each architecture.. after a few hours of trying to get rustc and linux to play ball, finally by actively selecting each compiler in the shell (CC=) before the compilation of each architecure, we was ready to go.</p>


<h1 id="Automating"><em>Bash</em></h1>
<p>now i needed to create an automation script that looped over 3 different architectures, x86_64, aarch64 and armv7 as these are the most common for linux. this was easy enough but then i had the absolutely genius idea of using the mail command to send a build report when it was complete. horror ensued.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver-cc-bash.png" alt="cross compile bash script" />
<br><sup>snippet of my cross compile script</sup>
</figure>

<h1 id="Automating"><em>smtp hell</em></h1>
<p>i had a horrible time configuring smtp. the end issue was using an icloud account that was linked to gmail. for some reason googles smtp server did not like it. it took a few hours and several failed attempts before i started from scratch and generated a new google account in order for it to work however it was finally fully configured, emails sent after each build or even each fail, with the subject of the email denoting build status and also some fun but important stats such as build time, temp and cpu load in the email body.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver-nightly2-bash.png" alt="nightly build script" />
<br><sup>nightly build script, with mail command and system stats</sup>
</figure>

<h1 id="Automating"><em>cron job</em></h1>
<p>the final hurdle! i love finally putting a script into cron, makes it feel finished. simple usage of crontab -e and the usual syntax means i now have builds for virgo over three architectures running every night at 2:00am, after a build a report is generated into a log file, attached to the email and sent. while i was here, i whipped up a few more scripts that run at different times, linting with clippys pedantic mode happens at 2:30, tests are run at 2:45:am and an overall system health report of the cm5 happens at 3am. all results are sent to me instantly via email, making my life a lot easier.</p>

<figure>
<img src="{{ site.baseurl }}/devserver/img/devserver-nightly2-bash.png" alt="nightly build script" />
<br><sup>crontab, with scripts executing at 2, 230, 245 and 3am respectively</sup>
</figure>

<h1 id="Automating"><em>final thoughts</em></h1>
<p>automation is king in the current, vast and high paced world of development. having builds, linting and tests run while you sleep is a game changer and this is just the start of it. we could have scripts execute on a commit using hooks with our local git server, run automated analysis on project changes, lifecycle, code quality or errors, utilize docker and kubernetes with bash and cron to automate containerized builds in a dedicated environment... the options are endless. plus, bash scripting is fun and an extremely useful skill in your toolkit, so automation also makes for good practice.

until next time, <br>
Dru x</p>


