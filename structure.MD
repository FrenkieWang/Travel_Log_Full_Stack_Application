login-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── index.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md


## 📦 Backend Dependencies

| Package Name | Description |
|--------------|-------------|
| `express`    | A lightweight web framework for Node.js used to create APIs. |
| `sequelize`  | An ORM (Object-Relational Mapping) library for interacting with MySQL databases. |
| `mysql2`     | MySQL driver required by Sequelize to connect to the database. |
| `dotenv`     | Loads environment variables from a `.env` file into `process.env`. |
| `bcryptjs`   | Used to hash and compare passwords for user authentication. |
| `jsonwebtoken` | Generates and verifies JWTs (JSON Web Tokens) for secure authentication. |
| `cors`       | Enables Cross-Origin Resource Sharing to allow the frontend and backend to communicate. |
