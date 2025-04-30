# How to use vite to create REACT Framework

npm create vite@latest frontend --template react

cd frontend

npm install

npm run dev

## Running

  VITE v4.x  ready in 300ms

  ➜  Local:   http://localhost:5173/

## Select CMD as terminal

ctrl + shift + p

Terminal: Select Default Profile

Command Prompt

## Structure

frontend/
├── index.html         // Project entry HTML
├── vite.config.js     // Vite configuration file
├── src/
│   ├── main.jsx       // React entry file
│   └── App.jsx        // Main component
└── package.json       // Dependency management

## Install Package
Backend:
npm install express mysql2 sequelize dotenv bcryptjs jsonwebtoken cors

Frontend:
npm install axios react-router-dom

## Deployment
Debug for vercel deployment - mysql2
https://stackoverflow.com/questions/50614067/error-please-install-mysql2-package-manually

Frontend env:
- VITE_HOST_URL
- import.meta.env.VITE_HOST_URL
- cannot use app.use(cors())
- Must specify the origin, method, allowedHeaders(Authorization) and credentials from corsOptions 