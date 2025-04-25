const TravelLog = require('../models/travelLogModel.js');

// Create a TravelLog
exports.create = (request, response) => {
  TravelLog.create(request.body)
    .then(travelLog => response.status(201).json(travelLog))
    .catch(error => response.status(500).json(error.message));
};

// Get All TravelLogs
exports.getAll = (request, response) => {
  TravelLog.findAll()
    .then(travelLogs => response.json(travelLogs))
    .catch(error => response.status(500).json(error.message));
};

// Get One TravelLog by id
exports.getById = (request, response) => {
  TravelLog.findByPk(request.params.id)
    .then(travelLog => response.json(travelLog))
    .catch(error => response.status(500).json(error.message));
};

// Update a TravelLog
exports.update = (request, response) => {
  TravelLog.findByPk(request.params.id)
    .then(travelLog => {
      return travelLog.update(request.body)
        .then(updated => response.json(updated));
    })
    .catch(error => response.status(500).json(error.message));
};

// Delete a TravelLog
exports.delete = (request, response) => {
  TravelLog.findByPk(request.params.id)
    .then(travelLog => {
      return travelLog.destroy()
        .then(() => response.json('TravelLog deleted'));
    })
    .catch(error => response.status(500).json(error.message));
};
