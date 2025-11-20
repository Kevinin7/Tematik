const User = require('../models/User');
const Prediction = require('../models/Prediction');

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const predictions = await Prediction.find({ user: id });

    let total = predictions.length;
    let exactMatches = 0;
    let correctWinners = 0;
    let totalPoints = 0;

    for (const pred of predictions) {
      const { predictedScore, actualScore, pointsEarned } = pred;

      if (actualScore.home != null && actualScore.away != null) {
        if (
          predictedScore.home === actualScore.home &&
          predictedScore.away === actualScore.away
        ) {
          exactMatches++;
        }

        const predictedDiff = predictedScore.home - predictedScore.away;
        const actualDiff = actualScore.home - actualScore.away;

        if (
          (predictedDiff > 0 && actualDiff > 0) ||
          (predictedDiff < 0 && actualDiff < 0) ||
          (predictedDiff === 0 && actualDiff === 0)
        ) {
          correctWinners++;
        }

        totalPoints += pointsEarned;
      }
    }

    res.json({
      userId: id,
      totalPredictions: total,
      exactMatches,
      correctWinners,
      totalPoints
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular estadísticas del usuario' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserStats
};  