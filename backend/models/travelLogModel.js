const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const TravelLog = sequelize.define('TravelLog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  postDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW 
  },
  tags: {
    type: DataTypes.JSON, 
    defaultValue: []
  }
}, {
  tableName: 'TravelLog'
});

module.exports = TravelLog;
