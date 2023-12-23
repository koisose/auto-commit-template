#!/bin/bash

# Get the list of untracked files
untracked_files=$(git ls-files --others --exclude-standard)

# Check if there are untracked files
if [ -n "$untracked_files" ]; then
    # Get the first untracked file
    first_untracked_file=$(echo "$untracked_files" | head -n 1)

    # Add the first untracked file
    git add "$first_untracked_file"

    echo "Added the first untracked file: $first_untracked_file"
else
    echo "No untracked files found."
fi
