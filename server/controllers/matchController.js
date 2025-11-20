const Match = require('../models/Match');

const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear partido' });
  }
};

module.exports = { createMatch };