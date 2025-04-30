# Assignment 5: Full-Stack Travel Blog Application

## Introduction

Developing a full-stack application utilizing React, MySQL, Express, Node.JS, and Axios to create a full-stack travel log website. Users of this website can log in and make posts (travel logs) about recent trips that they have been on, and also make posts for where they plan to go in the future (journey plans).

Backend deployment:
https://travel-log-full-stack-application-api.vercel.app/

Frontend deployment:
https://travel-log-full-stack-application.vercel.app/

## Objective

- Develop a full-stack application capable of storing travel information.
- Utilize Axios and React to perform CRUD activities with your Express server and MySQL database.

### Part 1: React [Frontend Technology] (20%)

- **Boilerplate:** Create a standard React application with a folder for each page (Login, Travel Logs, Journey Plans). The website uses React-Router to navigate between pages.
- **Login:** The Login Page should have the inputs for username and password for a user to login to the website. Once logged in succesfully, this page should display user information from the user model.
- **Travel Logs**: This page should display a list of all travel logs and provide CRUD functionality for each.
- **Journey Plans**: This page should display a list of all journey plans and provide CRUD functionality for each.

### Part 2: Express/Node.js [Backend Technology] (40%)

- **Boilerplate:** Set up a Node.js project with an Express server connecting to your database.
- **Controllers:** Implement all CRUD functionality for users, travel logs and journey plans in their own separate controllers.
- **Routes:** Create routes for each controller in their own file to direct all requests based on URLs.
- **Authentication:** Implement functionality to hash the password when the user registers with bcrypt, and when logging in they must match with the hashed credentials to view the logs and plans. Users should only be able to see plans and logs in their account.

### Part 3: SQL (MySQL) [Database Technology] (20%)

- **User Model:** Define a user model with fields for username [STRING], password [STRING with minimum length of 8], email [STRING with validation as email], address [STRING], travel logs [ARRAY of IDs] and journey plans[ARRAY of IDs]. You must validate and use the correct data types.
- **Travel Log Model:** Define a travel log model with fields for title [STRING], description [STRING], start date [DATE], end date [DATE], post date [DATE] and tags [ARRAY of Strings]. You must use the correct data types. You must validate and use the correct data types.
- **Journey Plan Model:** Define a journey plan model with fields for journey plan name [STRING], journey plan locations [ARRAY of Strings], start date [DATE], end date [DATE], list of activities [ARRAY of Strings] and a description [STRING]. You must validate and use the correct data types.

### Part 4: Porject Structure (20%)

```
frontend/                 # Frontend root directory
├── public/               # Static public assets
│   └── index.html        # HTML template
├── src/                  # Source code directory
│   ├── pages/            # React page components
│   │   ├── HomePage.jsx         # Home page
│   │   ├── JourneyPlanPage.jsx # Journey plan page
│   │   ├── LoginPage.jsx       # Login page
│   │   ├── RegisterPage.jsx    # Register page
│   │   └── TravelLogPage.jsx   # Travel log page
│   ├── App.jsx           # Main React component with routing logic
│   └── main.jsx          # React entry point
├── .env                  # Environment variables (e.g., VITE_HOST_URL)
├── .gitignore            # Files and folders ignored by Git
├── eslint.config.js      # ESLint configuration
├── index.html            # Vite default HTML template (used only for fallback)
├── package.json          # Project metadata and frontend dependencies
├── package-lock.json     # Locked versions of dependencies
├── vite.config.js        # Vite configuration file
└── README.md             # Project documentation
```

```
backend/                       # Backend root directory
├── controllers/               # Request handler logic (MVC controllers)
│   ├── journeyPlanController.js   # Controller for journey plans
│   ├── travelLogController.js     # Controller for travel logs
│   └── userController.js          # Controller for user operations
├── middleware/               # Custom middleware
│   └── verifyToken.js            # JWT token verification middleware
├── models/                   # Sequelize models
│   ├── journeyPlanModel.js       # Model for journey plans
│   ├── travelLogModel.js         # Model for travel logs
│   └── userModel.js              # Model for users
├── routes/                   # Route definitions
│   ├── journeyPlanRoutes.js      # Routes for journey plans
│   ├── travelLogRoutes.js        # Routes for travel logs
│   └── userRoutes.js             # Routes for users
├── .env                      # Backend environment variables (e.g., DB config, JWT secret)
├── .gitignore                # Files and folders ignored by Git
├── db.js                     # Sequelize DB initialization
├── server.js                 # Express server entry point
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Locked versions of dependencies
└── vercel.json               # Vercel deployment configuration for serverless
```

```
└── model.sql              # SQL schema definitions
```