const evaluationModel = require("../models/evaluation-model");

const getPopulatedEvaluationModel = async (evaluationModelId) => {
    const result = await evaluationModel.findById(evaluationModelId).populate('createdBy', '-password');
    return result;
};

module.exports = {
    getPopulatedEvaluationModel
};
