const express = require('express');
const router = express.Router();
const travelLogController = require('../controllers/travelLogController.js');

router.post('/', travelLogController.create);
router.get('/', travelLogController.getAll);
router.get('/:id', travelLogController.getById);
router.put('/:id', travelLogController.update);
router.delete('/:id', travelLogController.delete);

module.exports = router;
