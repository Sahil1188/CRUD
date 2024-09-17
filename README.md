# CRUD User Management System

This project provides a CRUD (Create, Read, Update, Delete) user management system where users can register, view their profile details, update their profile information, and delete their accounts. The system is built using React for the frontend, Tailwind CSS for styling, and Node.js with PostgreSQL for the backend.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for custom designs

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express.js**: Web application framework for Node.js
- **PostgreSQL**: Relational database management system
- **pg**: PostgreSQL client for Node.js

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js and npm installed. Download and install from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: Ensure you have PostgreSQL installed. Download and install from [postgresql.org](https://www.postgresql.org/download/).

### Setting Up PostgreSQL

1. **Create the Database**

   Open PostgreSQL command line (`psql`) or a GUI tool like pgAdmin, and execute the following commands to create the database and table:

   ```sql
   CREATE DATABASE users;
   \c users
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) NOT NULL UNIQUE,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(255) NOT NULL
   );

2.  **Configure Database Credentials**

    Open `server.js` in your project and update the database connection details:

    ```js
    const { Pool } = require('pg');
    const pool = new Pool({
      user: 'your_db_user',           
      host: 'localhost',
      database: 'users',
      password: 'your_db_password',   
      port: 5432,
    });

### Installing Dependencies

#### Frontend

Navigate to the `client` directory and install the required npm packages:
```bash
cd client
npm install
```
#### Backend

Navigate to the root directory and install the required npm packages:
```bash
npm install
```
### Running the Project

#### Start the Backend Server
In the root directory of your project, start the server.js server:
```bash
node server.js
```
The server will run on http://localhost:5000.

#### Start the Frontend Application
In the client directory, start the React application:

```bash
cd client
npm start
```
The frontend will run on http://localhost:3000.

### API Endpoints

- `GET /api/users/:id` - Get user details
- `POST /api/users` - Register a new user
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete a user

### Frontend Pages

- **Home**: Landing page of the application
- **Register**: User registration page
- **Login**: User Login page
- **Profile**: User profile page where users can view, update, or delete their account

### Web and Database Images
In the 
```bash 
client/src/public
```
there are jpg images of each pages of the website as well as the Database

## License
This project is licensed under the MIT License - see the LICENSE file for details.


