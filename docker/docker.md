# Docker

[Docker Course](https://www.youtube.com/watch?v=31k6AtW-b3Y&t=130s&ab_channel=PiyushGarg)
[GitHub](https://gist.github.com/piyushgarg-dev/ea8c5aa52de0496753b88cd938abd728)
[Whiteboard](https://app.eraser.io/workspace/yTPql82lXyOpbyX63Xgn)
[Course](https://learn.piyushgarg.dev/learn/docker)
[installation](https://www.docker.com/products/docker-desktop/)
[hub.docker.com](hub.docker.com)

## Part 1

1.  Problem Statement

    - Let say in a local system we have installed node, mongo, and redis of specific version and our project working fine but what if we have to run this project in some other PC?
    - Now we have to setup all dependencies with same version to another system or any cloud platform as well but what if some of the dependencies are OS specific and both projects are running on different OS.
    - So docker solve this problem where we need to replicate the multiple environment.

    ### How docker solve this problem?

    - Docker provides lightweight containers to configure the environment(like OS, Node, Mongo).
    - we can share this containers to other developers or deploy on cloud.

2.  Installation of Docker CLI and Desktop

    1. `Docker demon:` Actual docker which create, destroy containers
    2. `Docker desktop:` GUI for to manipulate docker

3.  Understanding Images v/s Containers

    1. `Images:` Images are like operating system which required a container to run.
    2. `Containers:` Containers are isolated environment which run different images. Every container has its unique name and ID.

    ### Run docker container in your system using command `docker run`:

    - `docker run -it ubuntu` (-it: interactive mode, ubuntu - a lightweight image for ubuntu OS)
    - If the ubuntu is not present in your system it will first download it from [hub.docker.com](hub.docker.com).
    - Generally we create our custom image with ubuntu, node, mongo, redis or what ever we required to run our project. Then we can publish to docker hub so that other can use it to run a project.

4.  Running Ubuntu Image in Container

5.  Multiple Containers

6.  Port Mappings

    - Containers are isolates so any server which we have run inside a container that will be not accessible in your system(browser). So we have to expose it.
    - We have a following command to expose the port of the server.
    - `docker run -p <server_port>:<container_port> -it <image_name>` (-p: port mapping)

7.  Environment Variables - Pass Environment Variables to container

    - docker run -e <key>=<value> -e <key>=<value> -e <key>=<value> <image_name>

8.  Dockerization of Node.js Application

    1. Dockerfile - A configuration file for docker image
    2. Caching Layers - When we build a docker file it cache all the commands from Dockerfile
       - Docker checks if the layer's instruction has been executed before with the same context.
       - If it has, Docker will reuse the cached layer.
       - If the instruction or the context (like files copied, or changed any file content) has changed, Docker will rebuild that layer and all the layers that follow.
    3. Publishing to Hub
       1. Create an account in [hub.docker.com](hub.docker.com)
       2. Create a repository
       3. Build your project image with repository name: `docker build -t <repository_name> <path_of_Dockerfile>`
       4. push your docker image: `docker push <repository_name>`
          1. Command for docker login: `docker login`

    ### Dockerization

    - Have to create a file named `Dockerfile` in your project for docker configuration.
    - It will create a docker image of your project (including node.js, package.json, main.js, package-lock.json).

    ### Configuration Steps

    1. Choose base image (like ubuntu) - here we are choosing ubuntu OS.
    2. Install dependencies:

    - [Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)

    1. Copy files from source(project) to destination(docker image).
    2. Run command to Install node dependencies.
    3. Set ENTRYPOINT when someone run the container.
    4. Run command to build the image.
       - `docker build -t <image_name> <path_of_Dockerfile` -t: for image name
       - Ex: `docker build -t docker-node .`

    ### Dockerfile Commands

    - These commands are broken down in layers which are cached by default.
    - Docker checks if the layer's instruction has been executed before with the same context.
    - If it has, Docker will reuse the cached layer.
    - If the instruction or the context (like files copied, or changed any file content) has changed, Docker will rebuild that layer and all the layers that follow.

    ```docker
       # Layer 1
       FROM ubuntu

       # Layer 2
       RUN apt-get update
       RUN apt-get install -y curl
       RUN curl -sL https://deb.nodesource.com/setup_18.x | base ~
       RUN apt-get upgrade -y
       RUN apt-get install -y nodejs

       # Layer 3
       COPY package.json package.json
       COPY package-lock.json package-lock.json

       # Layer 4
       RUN npm install

       # Layer 5
       # COPY main.js index.js
       # COPY . . - Copy all files except files from .dockerignore
       COPY . .

       # Layer 6
       ENTRYPOINT ["node", "index.js"]
    ```

9.  Docker Compose:

    - In real world projects we may have multiple images(like postgres, redis, mongo) to run a single project. So we are creating a file named `docker-compose.yml` with some configurations like:

      1. `version:` version of a docker compose
      2. `services:` Image configurations
         1. `ports:` Port configuration of an image
         2. `environment:` Environment variables required for an image

    - After configuration of a `docker-compose.yml` we can the docker compose.
      - `Create, Start and running a docker compose:` `docker compose up`, for linux: `sudo docker compose up`
      - `Start and running a docker compose in a background:` `docker compose up -d`, for linux: `sudo docker compose up -d` , -d: detached mode
      - `Remove a docker compose:` `docker compose down`, for linux: `sudo docker compose down`
      - `Start a docker compose:` `docker compose start`, for linux: `sudo docker compose start`
      - `Stop a docker compose:` `docker compose stop`, for linux: `sudo docker compose stop`

## Part 2

1. [Docker Networking](https://docs.docker.com/engine/network/)

   - Containers which are on same network can communicate with each other.
   - To check available drivers: `docker network ls`
   - Mainly bridge (default driver), host and null drivers are available by default.
   - Command to check network driver info (ex: name, id, containers which are connected through a network driver): `docker network inspect <network_driver>`
     - Ex: `docker network inspect bridge`
   - Command to run containers in different driver mode: `docker run -it --network=<host | bridge | none> <container_name>`
   - Ex: `docker run -it --network=none busybox`

   1. Bridge:
      - Establish a bridge between your host machine and docker container for network connection (internet connectivity).
   2. Host
      - Directly connected to our host machine without any bridge.
   3. None
      - No access to network

   ### Diff b/w bridge and host

   - Docker as default uses bridge mode so we need to map a port for a container because container is not directly connected to a host machine.
   - If it uses host mode and are both on a same network so we don't need to map it explicitly.

   ### Create own network

   - `command:` docker network create -d bridge <network_name> , -d: driver
   - `Ex:` docker network create -d bridge youtube
   - Generally we create our custom network and used it in a database or database related containers. So that we don't need to manage the IP addresses.

2. Volume Mounting

   - When we create a container it used some memory which will be destroyed when we destroyed a container.
   - So to prevent this we can use `volume mounting`.
   - `Command to mount data from container to host machine:` docker run -it -v <host_machine_path>:<container_folder_path> <image_name>, -v: volume mounting
   - [We can also create own volume](https://docs.docker.com/engine/storage/volumes/).

3. Efficient Caching in Layers

   - We have to efficiently set the layers of Dockerfile, as they are cache by default.

4. [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)

   - We can use multi-stage builds to reduce the size of our final image.

## Commands:

### Containers:

- `List all open (running) containers:` docker container ls OR docker ps
- `List all containers (including closed containers):` docker container ls -a OR docker ps -a
- `Start containers:` docker start <container_name>
- `Stop containers:` docker stop <container_name>

  To open a Docker container for manipulation, if container is closed you have to start it first:

- `Execute command in a container and return a result - disconnect the docker container:` docker exec <container_name> <command_name>
- `Execute command in a container - it will not disconnect the docker container:` docker exec -it <container_name> <command_name>
- `Ex:` docker exec -it <container_name> bash

### Images:

- `List all images:` docker images OR docker images ls
- `Start a new container from a specified image:` docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
  - Common Options:
    `-d :` Run the container in detached mode (in the background).
    `-p :` Publish a container's port to the host.
    `-e :` Set environment variables inside the container.
    `--name:` Assign a name to the container.
    `-v :` Mount a volume from the host into the container.
    `--rm:` Automatically remove the container when it exits.
    `-it :` Run the container in interactive mode with a terminal (e.g., for interactive sessions).
  - Ex: `docker run -d -p 8080:80 --name my_container nginx`
