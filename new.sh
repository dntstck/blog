#!/bin/bash

if [ $# -lt 2 ]; then
  echo "Usage: $0 <title> <tags>"
  echo "Ex: $0 \"Example\" \"misc\" "
  exit 1
fi

TITLE=$1
TAGS=$2
echo "Generating $TITLE.md with tags $TAGS"

DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "Today's date is $DATE"
echo "Generating.."

PUBLISH_DATE=$(date -u -d "$DATE +1 day" +"%Y-%m-%dT00:00:00Z")
echo "Setting Publish Date to midnight.."

FILENAME=$(echo "$TITLE" | tr ' ' '-').md

# relative path for the scheduled dir
DIRECTORY="./scheduled"
if [ ! -d "$DIRECTORY" ]; then
  mkdir -p $DIRECTORY
fi

# create front matter 
cat <<EOF > $DIRECTORY/$FILENAME
---
title: "$TITLE"
date: $DATE
publishDate: $PUBLISH_DATE
tags: [$TAGS]
---

h1 id="title"><em>title</em></h1>

<p>Content</p>

<h2 id="title2"><em>FTitle2</em></h2>
<p>Content2</p>

<figure>
<img src="{{ site.baseurl }}/CATEGORY/img/FILENAME.png" alt="IMG ALT" />
<br><sup>img desc</sup>
</figure>

<h2 id="title3"><em>Title3</em></h2>

EOF

echo "$TITLE.md generated at $DIRECTORY/$FILENAME"