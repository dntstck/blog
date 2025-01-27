#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
# Output directory for resized images
OUTPUT_DIR="$SCRIPT_DIR/resized"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through each image in the script's directory
for IMAGE in "$SCRIPT_DIR"/*.{jpg,jpeg,png}; do
  # Check if the file exists
  if [[ -f "$IMAGE" ]]; then
    # Get the base name of the image file
    BASENAME=$(basename "$IMAGE")
    # Resize the image to 480x320 pixels
    convert "$IMAGE" -resize 480x320\! "$OUTPUT_DIR/$BASENAME"
    
    echo "Resized $IMAGE and saved to $OUTPUT_DIR/$BASENAME"
  fi
done

echo "Resize successful."

