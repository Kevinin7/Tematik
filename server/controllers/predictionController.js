const Prediction = require('../models/Prediction');

// Crear una nueva predicción
const createPrediction = async (req, res) => {
  try {
    const { user, matchId, predictedScore } = req.body;

    const prediction = new Prediction({
      user,
      matchId,
      predictedScore
    });

    await prediction.save();
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la predicción' });
  }
};

// Obtener predicciones por usuario
const getPredictionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const predictions = await Prediction.find({ user: userId }).populate('matchId').lean();

    const formatted = predictions.map(p => ({
      id: p._id,
      matchId: p.matchId,
      predictedScore: p.predictedScore,
      actualScore: p.actualScore,
      pointsEarned: p.pointsEarned,
      createdAt: p.createdAt
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener predicciones del usuario' });
  }
};

// Actualizar resultado de una predicción
const updatePredictionResult = async (req, res) => {
  try {
    const { predictionId } = req.params;
    const { actualScore, pointsEarned } = req.body;

    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return res.status(404).json({ error: 'Predicción no encontrada' });
    }

    prediction.actualScore = actualScore;
    prediction.pointsEarned = pointsEarned;

    await prediction.save();
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la predicción' });
  }
};

module.exports = {
  createPrediction,
  getPredictionsByUser,
  updatePredictionResult
};