// models/codingStatsModel.js
const mongoose = require('mongoose');

const codingStatsSchema = new mongoose.Schema({
  platform: { type: String, required: true }, // e.g., 'LeetCode', 'GFG'
  username: { type: String },
  profileLink: { type: String },
  problemSolved: { type: Number, default: 0 },
  rank: { type: String },
  stars: { type: Number },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodingStats', codingStatsSchema);
