const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getPredictionsByUser,
  updatePredictionResult
} = require('../controllers/predictionController');

router.post('/', createPrediction);
router.get('/:userId', getPredictionsByUser);
router.put('/result/:predictionId', updatePredictionResult);

module.exports = router;