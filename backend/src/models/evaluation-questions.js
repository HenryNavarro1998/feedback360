const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [OptionSchema],
    required: {
        type: Boolean,
        default: true
    }
});

module.exports = {
    QuestionSchema,
    OptionSchema
};