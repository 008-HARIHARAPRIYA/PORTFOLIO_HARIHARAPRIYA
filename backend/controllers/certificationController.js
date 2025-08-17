const Certification = require('../models/certificationModel');

// Create new entry
exports.createCertification = async (req, res) => {
  try {
    const newEntry = new Certification(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Certification/Achievement added', data: newEntry });
  } catch (err) {
    res.status(500).json({ error: 'Error adding entry' });
  }
};

// Get all entries
exports.getAllCertifications = async (req, res) => {
  try {
    const entries = await Certification.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve entries' });
  }
};

// Get single entry by ID
exports.getCertificationById = async (req, res) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Entry not found' });
    res.status(200).json(cert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get entry' });
  }
};

// Update entry
exports.updateCertification = async (req, res) => {
  try {
    const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Entry not found to update' });
    res.status(200).json({ message: 'Entry updated', data: updated });
  } catch (err) {
    res.status(500).json({ error: 'Error updating entry' });
  }
};

// Delete entry
exports.deleteCertification = async (req, res) => {
  try {
    const deleted = await Certification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Entry not found to delete' });
    res.status(200).json({ message: 'Entry deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting entry' });
  }
};
