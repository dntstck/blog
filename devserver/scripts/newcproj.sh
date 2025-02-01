#!/bin/bash

echo "Enter your project name:"
read PROJECT_NAME
echo "Creating project '$PROJECT_NAME'..."

mkdir $PROJECT_NAME
cd $PROJECT_NAME
git init

mkdir src include bin
touch src/main.c
touch Makefile

cat \<\<EOL \> src\/main.c
#include 

int main() {
 printf\("helloworld"\);
 return 0;
}
EOL

cat \<\<EOL \> Makefile
CC=gcc
CFLAGS=-Iinclude

all: \$(PROJECT_NAME)

\$(PROJECT_NAME): src/main.c
$(CC) src/main.c -o bin/\$(PROJECT_NAME) \$(CFLAGS)
EOL

echo " '$PROJECT_NAME' created successfully"