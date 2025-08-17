const CodingStats = require('../models/codingStatsModel');

// Create new coding stat
exports.createCodingStat = async (req, res) => {
  try {
    const newStat = new CodingStats(req.body);
    await newStat.save();
    res.status(201).json({ message: 'Coding stat added successfully', data: newStat });
  } catch (err) {
    res.status(500).json({ error: 'Error adding coding stat' });
  }
};

// Get all coding stats
exports.getAllCodingStats = async (req, res) => {
  try {
    const stats = await CodingStats.find();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get coding stats' });
  }
};

// Get coding stat by ID
exports.getCodingStatById = async (req, res) => {
  try {
    const stat = await CodingStats.findById(req.params.id);
    if (!stat) return res.status(404).json({ message: 'Stat not found' });
    res.status(200).json(stat);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get coding stat' });
  }
};

// Update coding stat
exports.updateCodingStat = async (req, res) => {
  try {
    const updated = await CodingStats.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Stat not found to update' });
    res.status(200).json({ message: 'Stat updated', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Error updating coding stat' });
  }
};

// Delete coding stat
exports.deleteCodingStat = async (req, res) => {
  try {
    const deleted = await CodingStats.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Stat not found to delete' });
    res.status(200).json({ message: 'Stat deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting coding stat' });
  }
};
