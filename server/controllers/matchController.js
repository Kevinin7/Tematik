const Match = require('../models/Match');

// Crear un nuevo partido
const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el partido' });
  }
};

// Obtener todos los partidos
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
};

module.exports = {
  createMatch,
  getAllMatches
};