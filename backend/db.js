const { Sequelize } = require('sequelize'); // OObject-Relational Mapping
const mysql2 = require('mysql2')
require('dotenv').config();

// Initialize Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2 // vercel
  }
);

module.exports = sequelize;
