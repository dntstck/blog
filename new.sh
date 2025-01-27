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

# relative path for the todo dir
DIRECTORY="./todo"
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

<h1 id="$TITLE"><em>$TITLE</em></h1>

<p>Content</p>

<h2 id="$TITLE"><em>$TITLE</em></h2>
<p>Content2</p>

<figure>
<img src="{{ site.baseurl }}/$TAGS/img/$TITLE.png" alt="$TITLE" />
<br><sup>img desc</sup>
</figure>

EOF

echo "$TITLE.md generated at $DIRECTORY/$FILENAME"