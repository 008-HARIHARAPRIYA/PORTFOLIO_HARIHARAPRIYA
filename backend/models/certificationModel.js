const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., Certification course, Intern, Outside participation
  provider: { type: String, required: true }, // Issuing org or event name
  proof: { type: String }, // File URL (image/PDF of certificate)
  description: { type: String },
  issuedDate: { type: Date },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certification', certificationSchema);
