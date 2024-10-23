# Role Based Access Control

## Dependencies (package) used:

- express - for server and middlewares
- jsonwebtoken - for authentication strings
- bcryptjs - for encryption and decryption
- dotenv - for variables
- mongoose - for database
- nodemon - as dev dependency to run the server in development environment
- cors - to allow cross origin resource sharing

## Folder structure:

- index.js - for server
- config - for project configurations
- routes - for API routes
- controller - for API controllers
- services - for API services
- middleware - for API middlewares
- models - for database models

## Auth:

- api/auth/register
- api/auth/login

## User Routes:

- api/users/admin - accessed by admin only
- api/users/manager - accessed by admin and manger only
- api/users/user- - accessed by admin, manager and user only

## Roles:

- admin
- manager
- user
