
install_docker() {
    echo "nstalling docker..."
    sudo apt-get update
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) \
       stable"
    sudo apt-get update # sudo apt update if on Ubuntu
    sudo apt-get install -y docker-ce # sudo apt install -y docker-ce if on ubuntu
    sudo usermod -aG docker ${USER}
    echo "docker installed."
}

install_k3s() {
    echo "Installing K3s..."
    curl -sfL https://get.k3s.io | sh -s - --docker
    echo "K3s installed"
}

create_dockerfile() {
    cat <<EOF > Dockerfile

FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
EOF
    echo "Dockerfile created."
}

create_docker_compose() {
    cat <<EOF > docker-compose.yml
version: '3'
services:
  web:
    image: my-node-app
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    environment:
      - NODE_ENV=development
EOF
    echo "docker-compose.yml created."
}


deploy_k3s() {
    kubectl create deployment $project_name --image=$image_name
    kubectl expose deployment $project_name --type=LoadBalancer --port=8080
    echo "Project deployed to K3s."
}


read -p "Enter project name: " project_name
read -p "Enter project directory (absolute path): " project_directory
read -p "Enter Docker image name: " image_name
read -p "Do you want to install Docker? (yes/no): " install_docker_choice
read -p "Do you want to install K3s? (yes/no): " install_k3s_choice
read -p "Do you want to deploy the project with K3s? (yes/no): " deploy_k3s_choice


if [ "$install_docker_choice" = "yes" ]; then
    install_docker
fi


if [ "$install_k3s_choice" = "yes" ]; then
    install_k3s
fi

mkdir -p $project_directory
cd $project_directory

create_dockerfile
create_docker_compose

docker-compose up -d

if [ "$deploy_k3s_choice" = "yes" ]; then
    deploy_k3s
fi

echo "setup complete."