const { DataTypes } = require('sequelize'); // define field and type
const sequelize = require('../db');

// Define Model -> table in SQL
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [8] },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  travelLogs: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  journeyPlans: {
    type: DataTypes.JSON,
    defaultValue: [],
  }
}, {
  tableName: 'User' 
});

module.exports = User;
