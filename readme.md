# Ticking System

# Table of Contents

1. [Introduction](#introduction)
2. [Backend Packages](#backend-packages)
3. [Frontend Packages](#frontend-packages)
4. [Backend Folder Structure](#backend-folder-structure)
5. [Frontend Folder Structure](#frontend-folder-structure)
6. [Installation Instructions](#installation-instructions)
7. [Usage Guidelines](#usage-guidelines)
8. [Working In Progress](#working-in-progress)

<!-- TOC --><a name="introduction"></a>

## Introduction

The Ticking System is a MERN stack project, which stands for MongoDB, Express, React, and Node.js.

The project revolves around a Step-By-Step Ticket Approving System. Users at the lowest role level can request a ticket, which progresses through approval stages at each level. If a ticket request is rejected at any stage, the process restarts from the lowest role level user. Once the highest level user approves the ticket, the processing is complete.

---

<!-- TOC --><a name="backend-packages"></a>

## Backend Packages

- **bcrypt** : Hashing passwords for user authentication.
- **cookie-parser** : Parsing cookies for handling user sessions.
- **cors** : Enabling Cross-Origin Resource Sharing for client-server communication.
- **dotenv** : Loading environment variables from a .env file.
- **express** : Building the server-side application framework.
- **express-async-handler** : Handling asynchronous operations in Express routes.
- **jsonwebtoken** : Generating and verifying JSON Web Tokens for user authentication.
- **mongoose** : Object Data Modeling (ODM) library for MongoDB and Node.js.
- **nodemon** : Automatically restarting the Node.js application upon file changes during development.

<!-- TOC --><a name="frontend-packages"></a>

## Frontend Packages

- **@tanstack/react-table** : Creating flexible and extensible tables in React applications.
- **axios** : Making HTTP requests from the client-side to the server.
- **dotenv** : Loading environment variables from a .env file in the React application.
- **react** : JavaScript library for building user interfaces.
- **react-hook-form** : Managing form state and validation in React forms.
- **react-router-dom** : Declarative routing for React applications.
- **eslint** : JavaScript linting utility for identifying and fixing code errors and inconsistencies.
- **postcss** : Transforming CSS with JavaScript plugins.
- **tailwindcss** : Utility-first CSS framework for rapidly building custom designs.
- **vite** : Next-generation frontend tooling for React development.

<!-- TOC --><a name="backend-folder-structure"></a>

## Backend Folder Structure

The backend of the application is structured as follows:

### Entry Point: `index.js`

The index.js file serves as the entry point for the backend application. It handles service declaration, route declaration, and database initialization.

### Soucre (`src`) Folder Structure

Under the src folder, the following structure is maintained:

- **Config File** : Contains configuration files required for the backend services.
- **Controllers** : Houses controller files responsible for handling business logic and interacting with models.
- **database** : Holds database-related files, including schemas, migrations, and seed data.
- **helpers** : Contains helper functions or utilities used across the backend services.
- **middleware** : Stores middleware functions responsible for request processing, authentication, validation, etc.
- **models** : Contains database models representing entities and data schemas.
- **routes** : Houses route files defining API endpoints and their corresponding controller methods.

<!-- TOC --><a name="installation-instructions"></a>

## Installation Instructions

### For Backend

1. Navigate to the `backend` directory:

```cmd
 cd backend
```

2. Create a copy of the `.env.example` file and name it `.env`. Update the `.env` file with your MongoDB connection URI and a secure JWT token secret:

```cmd
cp .env.example .env
```

Update the `.env` file:

```text
MONGODB_URI=<your_mongodb_uri>
JWT_TOKEN_SECRET=<your_jwt_token_secret>
```

3. Install the required dependencies:

```cmd
 npm install
```

4. Start the backend server in development mode:

```cmd
 npm run dev
```

### For Frontend

1. Navigate to the `frontend` directory:

```cmd
 cd frontend
```

2. Create a copy of the `.env.example` file and name it `.env`. Update the `.env` file with your MongoDB connection URI and a secure JWT token secret:

```cmd
cp .env.example .env
```

Update the `.env` file:

```text
base_Url=<your_backend_api_endpoint_uri>
```

3. Install the required dependencies:

```cmd
 npm install
```

4. Start the backend server in development mode:

```cmd
 npm run dev
```

<!-- TOC --><a name="usage-guidelines"></a>

## Usage Guidelines

To interact with the backend API endpoints, you can use the provided Postman API collection and environment.

<!-- TOC --><a name="working-in-progress"></a>

## Working In Progress

### Backend Development

- Status: All requirements have been implemented and are functional.

### Frontend Development

- Status: Currently, only Authentication and Authorization functionalities have been completed.

I am working on expanding the frontend functionalities to include additional features and enhancements.
