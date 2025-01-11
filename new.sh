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

<style> 
body, .content { 
  word-wrap: break-word;
  overflow-wrap: break-word; 
  box-sizing: border-box;
  } /* fix blog text overflowing */ 
#blog-post { 
  max-width: 80%;
  margin-left: 100px;  
  padding: 0 1rem; 
  word-wrap: break-word;
  overflow-wrap: break-word;
  box-sizing: border-box;
  } 
hr {
  max-width: 100%
}
</style>
<div id="blog-post">

Blog Content here. 

</div>
<br>
EOF

echo "$TITLE.md generated at $DIRECTORY/$FILENAME"