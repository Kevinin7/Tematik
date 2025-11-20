const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  predictedScore: {
    home: { type: Number, required: true },
    away: { type: Number, required: true }
  },
  actualScore: {
    home: { type: Number },
    away: { type: Number }
  },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', predictionSchema);