#!/bin/bash

src="/home/sysadmin/dev/blog/todo"
dest_dev="sysadmin@stream-x64:/home/sysadmin/dev/blog/todo"
dest_stream="sysadmin@dev-x64:/home/sysadmin/dev/blog/todo"

host=$(hostname)

echo "syncing todo folder..."

if [ "$host" = "dev-x64" ]; then
    echo "from dev-x64 → stream-x64"
    rsync -avz --update "$src/" "$dest_dev/"
elif [ "$host" = "stream-x64" ]; then
    echo "from stream-x64 → dev-x64"
    rsync -avz --update "$src/" "$dest_stream/"
else
    echo "unknown host: $host"
    exit 1
fi

echo "sync complete"

