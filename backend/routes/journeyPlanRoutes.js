const express = require('express');
const router = express.Router();
const journeyPlanController = require('../controllers/journeyPlanController.js');

router.post('/', journeyPlanController.create);
router.get('/', journeyPlanController.getAll);
router.get('/:id', journeyPlanController.getById);
router.put('/:id', journeyPlanController.update);
router.delete('/:id', journeyPlanController.delete);

module.exports = router;