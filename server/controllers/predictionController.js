const Prediction = require('../models/Prediction');

const createPrediction = async (req, res) => {
  try {
    const prediction = new Prediction(req.body);
    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la predicción' });
  }
};  

const getPredictionsByUser = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.params.userId }).populate('matchId');
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener predicciones' });
  }
};

module.exports = {
  createPrediction,
  getPredictionsByUser
};