const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evaluation',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['positive', 'constructive', 'general'],
    required: true
  }
}, {
  timestamps: true
});

// Índices
feedbackSchema.index({ evaluationId: 1 });
feedbackSchema.index({ providerId: 1 });

module.exports = mongoose.model('Feedback', feedbackSchema); 