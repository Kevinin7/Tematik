const express = require('express');
const router = express.Router();
const {
  createMatch,
  getAllMatches
} = require('../controllers/matchController');

// Obtener todos los partidos
router.get('/', getAllMatches);

// Crear un nuevo partido
router.post('/', createMatch);

module.exports = router;