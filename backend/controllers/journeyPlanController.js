const JourneyPlan = require('../models/journeyPlanModel.js');

// Create a JourneyPlan
exports.create = (request, response) => {
  JourneyPlan.create(request.body)
    .then(journeyPlan => response.status(201).json(journeyPlan))
    .catch(error => response.status(500).json(error.message));
};

// Get All JourneyPlans
exports.getAll = (request, response) => {
  JourneyPlan.findAll()
    .then(journeyPlans => response.json(journeyPlans))
    .catch(error => response.status(500).json(error.message));
};

// Get One JourneyPlan by id
exports.getById = (request, response) => {
  JourneyPlan.findByPk(request.params.id)
    .then(journeyPlan => response.json(journeyPlan))
    .catch(error => response.status(500).json(error.message));
};

// Update a JourneyPlan
exports.update = (request, response) => {
  JourneyPlan.findByPk(request.params.id)
    .then(journeyPlan => {
      return journeyPlan.update(request.body)
        .then(updated => response.json(updated));
    })
    .catch(error => response.status(500).json(error.message));
};

// Delete a JourneyPlan
exports.delete = (request, response) => {
  JourneyPlan.findByPk(request.params.id)
    .then(journeyPlan => {
      return journeyPlan.destroy()
        .then(() => response.json('JourneyPlan deleted'));
    })
    .catch(error => response.status(500).json(error.message));
};
