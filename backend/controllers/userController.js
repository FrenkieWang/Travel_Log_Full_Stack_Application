const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

// Register a User - Async
exports.register = (request, response) => {
  const { username, password, email, address } = request.body;
  if (password.length < 8) return response.status(400).json('Password too short');

  User.findOne({ where: { username } })
    .then(existingUser => {
      if (existingUser) return response.status(409).json('User already exists');    

      return bcrypt.hash(password, 10)
        .then(hash => {
          return User.create({
            username,
            password: hash,
            email,
            address,
            travelLogs: [],
            journeyPlans: [],
          });
        })
        .then(() => response.status(201).json('User registered successfully'))
    })
    .catch(error => response.status(500).json(error.message));
};

// User Login
exports.login = (request, response) => {
  const { username, password } = request.body;

  User.findOne({ where: { username } })
    .then(user => {
      if (!user) return response.status(404).json('User not found');

      bcrypt.compare(password, user.password)
        .then(match => {
          if (!match) return response.status(401).json('Wrong password');

          const token = jwt.sign({ id: user.id }, SECRET_KEY);
          response.json(token);
        });
    })
    .catch(error => response.status(500).json(error.message));
};

// Get Current User
exports.getCurrent = (request, response) => {
  User.findByPk(request.userId)
    .then(user => {
      if (!user) return response.status(404).json('User not found');

      const { username, email, address, travelLogs, journeyPlans } = user;
      response.json({ username, email, address, travelLogs, journeyPlans });
    })
    .catch(error => response.status(500).json(error.message));
};

// Add journeyPlan ID
exports.addJourneyPlan = (request, response) => {
  const userId = request.body.userId;
  const planId = request.body.planId;
  User.findByPk(userId)
    .then(user => {
      if (!user) return response.status(404).json('User not found');
      let plans = [];   
      plans = JSON.parse(user.journeyPlans);
      plans.push(planId); // add the planId 
      return user.update({ journeyPlans: plans });
    })
    .then(() => response.json('JourneyPlan added to user.'))
    .catch(error => response.status(500).json(error.message));
};

// Remove journeyPlan ID
exports.removeJourneyPlan = (request, response) => {
  const userId = request.body.userId;
  const planId = request.body.planId;
  User.findByPk(userId)
    .then(user => {
      if (!user) return response.status(404).json('User not found');
      let plans = [];
      plans = JSON.parse(user.journeyPlans);
      const updated = plans.filter(id => id != planId); // delete the planId
      return user.update({ journeyPlans: updated });
    })
    .then(() => response.json('JourneyPlan removed from user.'))
    .catch(error => response.status(500).json(error.message));
};

// Add travelLog ID
exports.addTravelLog = (request, response) => {
  const userId = request.body.userId;
  const logId = request.body.logId;
  User.findByPk(userId)
    .then(user => {
      if (!user) return response.status(404).json('User not found');
      let logs = [];
      logs = JSON.parse(user.travelLogs);
      logs.push(logId); // add the logId
      return user.update({ travelLogs: logs });
    })
    .then(() => response.json('TravelLog added to user.'))
    .catch(error => response.status(500).json(error.message));
};

// Remove travelLog ID
exports.removeTravelLog = (request, response) => {
  const userId = request.body.userId;
  const logId = request.body.logId;
  User.findByPk(userId)
    .then(user => {
      if (!user) return response.status(404).json('User not found');
      let logs = [];
      logs = JSON.parse(user.travelLogs);
      const updated = logs.filter(id => id != logId); // delete the logId
      return user.update({ travelLogs: updated });
    })
    .then(() => response.json('TravelLog removed from user.'))
    .catch(error => response.status(500).json(error.message));
};
