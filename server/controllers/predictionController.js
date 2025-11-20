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
    const { userId } = req.params;
    const predictions = await Prediction.find({ user: userId }).populate('matchId').lean();

    const formatted = predictions.map(p => ({
      id: p._id, // ← esto expone el ID como "id"
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

const updatePredictionResult = async (req, res) => {
  try {
    const { predictionId } = req.params;
    const { actualScore } = req.body;

    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return res.status(404).json({ error: 'Predicción no encontrada' });
    }

    prediction.actualScore = actualScore;

    // Calcular puntos
    const { predictedScore } = prediction;
    let points = 0;

    if (
      predictedScore.home === actualScore.home &&
      predictedScore.away === actualScore.away
    ) {
      points = 3; // Acierto exacto
    } else {
      const predictedDiff = predictedScore.home - predictedScore.away;
      const actualDiff = actualScore.home - actualScore.away;

      if (
        (predictedDiff > 0 && actualDiff > 0) ||
        (predictedDiff < 0 && actualDiff < 0) ||
        (predictedDiff === 0 && actualDiff === 0)
      ) {
        points = 1; // Acierto de ganador
      }
    }

    prediction.pointsEarned = points;
    await prediction.save();

    res.json({ message: 'Resultado actualizado', prediction });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la predicción' });
  }
};

module.exports = {
  createPrediction,
  getPredictionsByUser,
  updatePredictionResult
};