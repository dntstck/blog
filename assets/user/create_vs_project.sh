#!/bin/bash

echo "Enter your project name:"
read PROJECT_NAME

# (Same as previous script, plus:)
# Create .devcontainer files
mkdir .devcontainer
cat <<EOL > .devcontainer/devcontainer.json
{
    "name": "$PROJECT_NAME",
    "dockerFile": "Dockerfile",
    "extensions": [
        "ms-vscode.cpptools"
    ],
    "settings": {},
    "workspaceFolder": "/workspace",
    "workspaceMount": "source=${localWorkspaceFolder},target=/workspace,type=bind"
}
EOL

cat <<EOL > .devcontainer/Dockerfile
FROM gcc:latest

RUN apt-get update && apt-get install -y vim
WORKDIR /workspace
EOL

echo "VS Code dev container configured."