const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const evaluationSchema = new Schema({
  evaluationModel: {
    type: Schema.Types.ObjectId,
    ref: 'EvaluationModel',
    required: true
  },
  description: String,
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  evaluatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  answers: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  }],
  status: {
    type: String,
    enum: ['draft', 'in_progress', 'completed'],
    default: 'draft'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Índices
evaluationSchema.index({ employee: 1 });
evaluationSchema.index({ evaluatedBy: 1 });

module.exports = mongoose.model('Evaluation', evaluationSchema); 