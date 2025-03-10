const EvaluationModel = require('../models/evaluation-model');
const mongoose = require('mongoose');
const { getPopulatedEvaluationModel } = require('../utils/evaluation-model.util');


const evaluationModelController = {
    createEvaluationModel: async (req, res) => {
        try {
            const { name, description, questions } = req.body;
            console.log(req.user);
            const result = new EvaluationModel({ 
                name, 
                description, 
                questions, 
                createdBy: req.user.userId
            });
            await result.save();
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al crear el modelo de evaluación',
                error: error.message 
            });
        }
    },
    getEvaluationModels: async (req, res) => {
        try {
            
            const models = await EvaluationModel.find()
                .populate('createdBy', 'name email');
            
            res.json(models);
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al obtener los modelos de evaluación',
                error: error.message 
            });
        }
    },
    getEvaluationModelById: async (req, res) => {
        const result = await getPopulatedEvaluationModel(req.params.id);
        res.json(result);
    },
    updateEvaluationModel: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedModel = await EvaluationModel.findByIdAndUpdate(
                id,
                updateData,
                { 
                    new: true,
                    runValidators: true 
                }
            );

            if (!updatedModel) {
                return res.status(404).json({ message: 'Modelo de evaluación no encontrado' });
            }

            res.json({
                message: 'Modelo de evaluación actualizado exitosamente',
                model: updatedModel
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error al actualizar el modelo de evaluación',
                error: error.message 
            });
        }
    },
    deleteEvaluationModel: async (req, res) => {
        await EvaluationModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Evaluation model deleted successfully' });
    }
}


module.exports = evaluationModelController;
