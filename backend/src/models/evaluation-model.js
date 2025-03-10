const mongoose = require('mongoose');
const { QuestionSchema } = require('./evaluation-questions');
const evaluationModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    questions: [QuestionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Evitar la redefinición del modelo
let EvaluationModel;
try {
    EvaluationModel = mongoose.model('EvaluationModel');
} catch {
    EvaluationModel = mongoose.model('EvaluationModel', evaluationModelSchema);
}

module.exports = EvaluationModel;
