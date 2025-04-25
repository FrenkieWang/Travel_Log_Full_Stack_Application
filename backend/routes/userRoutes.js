const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const verifyToken = require('../middleware/verifyToken'); 

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/current', verifyToken, userController.getCurrent);

router.post('/addJourneyPlan', userController.addJourneyPlan);
router.post('/removeJourneyPlan', userController.removeJourneyPlan);

router.post('/addTravelLog', userController.addTravelLog);
router.post('/removeTravelLog', userController.removeTravelLog);

module.exports = router;