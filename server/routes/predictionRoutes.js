const express = require('express');
const router = express.Router();
const {
  createPrediction,
  getPredictionsByUser,
  updatePredictionResult
} = require('../controllers/predictionController');

// Rutas específicas primero
router.put('/result/:predictionId', updatePredictionResult);
router.get('/user/:userId', getPredictionsByUser);
router.post('/', createPrediction); // ← esta línea ya funcionará

module.exports = router;