#!/bin/bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

INPUT_DIR="$SCRIPT_DIR/raw_img"
OUTPUT_DIR="$SCRIPT_DIR/assets/img"

# loop thru
for IMAGE in $INPUT_DIR/*.{jpg,jpeg,png}; do
  if [[ -f "$IMAGE" ]]; then
    BASENAME=$(basename "$IMAGE")
    convert "$IMAGE" -resize 480x320\! "$OUTPUT_DIR/$BASENAME"
    echo "Resized $IMAGE → $OUTPUT_DIR/$BASENAME"
  fi
done

echo "Resize successful."
