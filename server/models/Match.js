const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teams: { home: String, away: String },
  date: Date,
  actualScore: { home: Number, away: Number },
  status: String // "upcoming", "finished"
});

module.exports = mongoose.model('Match', matchSchema);