const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  stats: {
    football: {
      predictionsMade: Number,
      correctPredictions: Number,
      points: Number
    }
  }
});

module.exports = mongoose.model('User', userSchema);