#!/bin/bash

echo "This script will convert blog posts to HTML, while retaining the markdown format"
echo "which is essential for the blog to display the file correctly."
echo "Enter the path to the Markdown file:"
read input_file

output_dir="./converted"
mkdir -p "$output_dir"

output_file="$output_dir/$(basename "$input_file")"

front_matter=$(awk 'BEGIN { in_front_matter = 0 } { if ($0 == "---") { if (in_front_matter) { print $0; exit } else in_front_matter=1; print; next } if (in_front_matter) print }' "$input_file")
content=$(awk 'BEGIN { in_front_matter = 0 } { if ($0 == "---") { if (in_front_matter) { in_front_matter=0; next } else in_front_matter=1; next } if (!in_front_matter) print }' "$input_file")

converted_content=$(echo "$content" | pandoc -f markdown -t html)

echo -e "$front_matter\n---\n$converted_content" > "$output_file"

if [ $? -eq 0 ]; then
    echo "Conversion successful! File updated: $output_file"
else
    echo "Conversion failed. Please check the input file and try again."
fi
