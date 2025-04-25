const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const JourneyPlan = sequelize.define('JourneyPlan', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locations: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  activities: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'JourneyPlan' 
});

module.exports = JourneyPlan;
