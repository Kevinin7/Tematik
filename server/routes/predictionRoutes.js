const express = require('express');
const router = express.Router();
const { createPrediction, getPredictionsByUser  } = require('../controllers/predictionController');

router.get('/:userId', getPredictionsByUser);   

router.post('/', createPrediction);

module.exports = router;