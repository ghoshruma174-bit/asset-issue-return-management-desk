# Asset Issue & Return Management Desk

A full-stack web application for managing organizational assets, employees, asset issuance, returns, availability, and transaction history.

The system provides a centralized dashboard for stock managers and administrators while giving employees access to their assigned asset information.

## Overview

The **Asset Issue & Return Management Desk** helps organizations maintain a digital record of:

* Available and issued assets
* Employee information
* Asset issue transactions
* Asset return transactions
* Return remarks and transaction history
* Asset availability status
* User authentication and role-based access

The application follows a **React + Spring Boot + PostgreSQL** architecture with JWT-based authentication.

## Key Features

### Authentication & Authorization

* User registration
* Secure login
* BCrypt password hashing
* JWT-based authentication
* Role-based access control
* Separate dashboard experience for employees and stock managers
* Protected backend APIs

### Asset Management

* Add new assets
* View asset inventory
* Update asset information
* Delete assets
* Track asset availability
* Identify issued and available assets

### Employee Management

* Add employees
* View employee records
* Update employee information
* Delete employee records
* View employee-related asset information

### Asset Issue

* Select an employee
* Select an available asset
* Record asset issue details
* Automatically update asset availability
* Maintain issue history

### Asset Return

* View issued assets
* Record asset return
* Add return remarks
* Automatically update asset availability
* Maintain complete transaction history

### Dashboard

The stock manager dashboard provides an overview of:

* Total assets
* Available assets
* Issued assets
* Total employees
* Asset transaction activity

### History

* View issue and return transactions
* Track asset assignment history
* Review returned assets
* Maintain an auditable transaction record

## User Roles

### Admin / Stock Manager

Can:

* Manage assets
* Manage employees
* Issue assets
* Process asset returns
* View transaction history
* Access management dashboards

### Employee

Can:

* Log in securely
* Access the employee dashboard
* View assigned asset information
* View personal issue history

## Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3
* React Router

### Backend

* Java
* Spring Boot
* Spring Web
* Spring Data JPA
* Spring Security
* JWT Authentication
* BCrypt Password Encoder
* Maven

### Database

* PostgreSQL
* Hibernate / JPA

### Deployment

* Render
* Docker

## Application Architecture

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         HTTP / JSON
                               │
                               ▼
                    ┌──────────────────────┐
                    │     Spring Boot      │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
                 ▼             ▼             ▼
           Controllers     Services      Security
                 │             │          JWT/BCrypt
                 └─────────────┼─────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Data JPA    │
                    │     Repositories     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      PostgreSQL      │
                    │       Database       │
                    └──────────────────────┘
```

## Project Structure

```text
Asset-Issue-Return-Management-Desk/
│
├── backend/
│   ├── src/main/java/com/assetmanagement/
│   │   ├── Config/
│   │   ├── Controller/
│   │   ├── DTO/
│   │   ├── Entity/
│   │   ├── Repository/
│   │   └── Service/
│   │
│   ├── src/main/resources/
│   │   └── application.properties.example
│   │
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── Data/
│   │   ├── pages/
│   │   ├── app.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── render.yaml
└── README.md
```

## Authentication Flow

The application uses JWT-based authentication.

```text
User
  │
  ▼
Login Form
  │
  │ HTTP POST + JSON
  ▼
AuthController
  │
  ▼
AuthService
  │
  ▼
UserRepository
  │
  ▼
PostgreSQL
  │
  ▼
Password Verification
  │
  ▼
JWT Token Generated
  │
  ▼
React Frontend
  │
  ▼
Protected Dashboard
```

Passwords are stored using **BCrypt hashing** rather than plain text.

JWT tokens are used to authenticate requests to protected backend endpoints.

## Asset Issue Flow

```text
Stock Manager
      │
      ▼
Select Employee
      │
      ▼
Select Available Asset
      │
      ▼
Create Issue Record
      │
      ▼
Database
      │
      ▼
Asset Status → ISSUED
```

## Asset Return Flow

```text
Stock Manager
      │
      ▼
Select Issued Asset
      │
      ▼
Enter Return Details
      │
      ▼
Create Return Record
      │
      ▼
Database
      │
      ▼
Asset Status → AVAILABLE
```

## Backend API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Assets

```text
GET    /api/assets
POST   /api/assets
PUT    /api/assets/{id}
DELETE /api/assets/{id}
```

### Employees

```text
GET    /api/employees
POST   /api/employees
PUT    /api/employees/{id}
DELETE /api/employees/{id}
```

### Issues & Returns

```text
GET  /api/issues
GET  /api/issues/my
POST /api/issues
PUT  /api/issues/{id}/return
```

Protected endpoints require valid authentication and appropriate user roles.

## Local Setup

### Prerequisites

Install the following:

* Java 17+
* Maven
* Node.js
* npm
* PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/ghoshruma174-bit/asset-issue-return-management-desk.git
cd asset-issue-return-management-desk
```

### 2. Configure PostgreSQL

Create a PostgreSQL database:

```sql
CREATE DATABASE asset_management_db;
```

Copy the example configuration:

```text
backend/src/main/resources/application.properties.example
```

to:

```text
backend/src/main/resources/application.properties
```

Update the database username, password, and JWT secret with your local values.

### 3. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs by default on:

```text
http://localhost:8080
```

### 4. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs by default on:

```text
http://localhost:5173
```

## Environment & Security

Sensitive configuration should **not** be committed to GitHub.

The following files are excluded from version control:

```text
application.properties
.env
.env.*
```

Use the provided example configuration:

```text
backend/src/main/resources/application.properties.example
```

for the required configuration structure.

Never commit:

* Database passwords
* JWT secrets
* API keys
* Private credentials

## Deployment

The project includes a `render.yaml` configuration for deployment on Render.

The deployment architecture consists of:

```text
React Frontend
       │
       ▼
Frontend Service
       │
       │ HTTP API
       ▼
Spring Boot Backend
       │
       ▼
PostgreSQL Database
```

Production environment variables should be configured through the deployment platform rather than committed to the repository.

## Future Enhancements

Possible future improvements include:

* Advanced search and filtering
* Employee-wise asset reports
* Overdue asset tracking
* Asset categories
* Role-specific permissions
* Approval workflow
* Printable issue/return slips
* Audit logs
* Analytics and reporting
* Email notifications

## Learning Outcomes

This project demonstrates practical experience with:

* React frontend development
* REST API development
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Spring Security
* JWT authentication
* BCrypt password hashing
* Role-based authorization
* CRUD operations
* HTTP and JSON communication
* Frontend-backend integration
* Full-stack project structure
* Docker-based deployment
* Render deployment configuration

## Author

**Ruma Ghosh**

B.Tech Computer Science

Full-Stack Development | Java | React | Spring Boot | SQL | IoT

## Repository

GitHub:

https://github.com/ghoshruma174-bit/asset-issue-return-management-desk
