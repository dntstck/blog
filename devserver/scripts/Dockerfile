FROM gcc:latest
WORKDIR /usr/src/app
COPY . .
RUN apt-get update && apt-get install -y vim
RUN make
CMD ["vim"]
