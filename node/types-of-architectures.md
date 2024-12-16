<samp>

# Types of architectures

1. Monolith
2. Multi-Tier (combination 2 or mor monolith architectures)
3. Microservices

## Monolith

- Frontend and Backend both are on same domain(server).
- Ex: Next.js

### Problems in Monolith

- `Same tech stack:` Have to use single language for both frontend and backend (Ex.JS)
- `Redeployment for a minor change:` Let say a new API is created or update then have to redeploy the whole project.
- `Taking more time in deployment`: As it will deploy whole project.
- `Can not scale one API`: Let say a products API has more traffic but you can not scale this single API.
- `Can't have different version of dependencies:` Let say one API required node 20 and others need a node 16.

## Multi-Tier (also called monolith)

- Frontend and Backend both are on separate domain(server).

## Microservices

- In microservices we divide frontend or backend in different services as per the features.
- So the frontend and multiple backend, are on separate domains(server).
- These microservices can be different Node.js App.
- Which we can deploy on different domains.
- Let say for an e-commerce backend we can define microservices for users, products and orders.

### Problems in Microservices - Docker and kubernetes will used for it.

- `How to scale these microservices:`
- `How microservices will communicate with each other:`

# Docker and kubernetes

- Docker is used to containerized our application with required dependencies and which runs in an isolated environment not in our machine.
- So we are going to create an image for each services and run it in the containers using docker.
- Now to communicate and scale these containers(as per the network traffic) using kubernetes(manage containers and add load balancing).

### Other Problems

- `It will be a complex task to manage all the micro services:`
- `Required more team members:`

```
So For the small projects we will use monolith and complex and big projects we will use microservices.
```

</samp>
