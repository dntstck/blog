#!/bin/bash

if [ $# -lt 2 ]; then
  echo "Usage: $0 <title> <tags...>"
  echo "Ex: $0 \"My Post\" misc personal linux"
  exit 1
fi

TITLE=$1
shift

# join remaining args into a single string

RAW_TAGS="$*"

# replace commas with spaces / normalize spacing & convert

TAG_LIST=$(echo "$RAW_TAGS" | tr ',' ' ' | xargs)
TAGS_YAML="[${TAG_LIST// /, }]"

echo "Tags parsed as: $TAGS_YAML"

# generate timestamps

DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
PUBLISH_DATE=$(date -u -d "$DATE +1 day" +"%Y-%m-%dT00:00:00Z")

# filename uses YYYY-MM-DD-title.md

DATE_PREFIX=$(date -u +"%Y-%m-%d")
SAFE_TITLE=$(echo "$TITLE" | tr ' ' '-')
FILENAME="${DATE_PREFIX}-${SAFE_TITLE}.md"

DIRECTORY="./todo"
mkdir -p "$DIRECTORY"

read -p "featured? (y/n): " FEATURED
if [[ "$FEATURED" =~ ^[Yy]$ ]]; then
  FEATURED_FLAG="featured: true"
else
  FEATURED_FLAG="featured: false"
fi

read -p "devlog? (y/n): " DEVLOG
if [[ "$DEVLOG" =~ ^[Yy]$ ]]; then
  DEVLOG_FLAG="devlog: true"
else
  DEVLOG_FLAG="devlog: false"
fi

cat <<EOF > "$DIRECTORY/$FILENAME"
---
title: "$TITLE"
date: $DATE
publishDate: $PUBLISH_DATE
$FEATURED_FLAG
$DEVLOG_FLAG
tags: $TAGS_YAML
---

EOF

echo "$TITLE.md generated at $DIRECTORY/$FILENAME"
