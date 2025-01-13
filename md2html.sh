#!/bin/bash

echo "Enter the path to the Markdown file:"
read input_file

echo "Enter the path for the output HTML file:"
read output_file

pandoc -f markdown -t html -o "$output_file" "$input_file"


if [ $? -eq 0 ]; then
    echo "Conversion successful! HTML file saved as $output_file"
else
    echo "Conversion failed. Please check the input file and try again."
fi
