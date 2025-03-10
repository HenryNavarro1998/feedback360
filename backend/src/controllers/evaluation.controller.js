const Evaluation = require('../models/evaluation');
const EvaluationModel = require('../models/evaluation-model');

const evaluationController = {

  // Obtener todas las evaluaciones
  getAllEvaluations: async (req, res) => {
    try {
      const evaluations = await Evaluation.find()
        .populate('evaluationModel')
        .populate('employee');
      res.json(evaluations);
    } catch (error) {
      console.error('Error getting evaluations:', error);
      res.status(500).json({ message: 'Error al obtener las evaluaciones' });
    }
  },

  // Obtener una evaluación por ID
  getEvaluation: async (req, res) => {
    try {
      console.log('Getting evaluation with ID:', req.params.id); // Debug

      const evaluation = await Evaluation.findById(req.params.id)
        .populate('evaluationModel')
        .populate('employee')
        .populate('evaluatedBy');

      console.log('Found evaluation:', evaluation); // Debug

      if (!evaluation) {
        console.log('Evaluation not found'); // Debug
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }

      res.json(evaluation);
    } catch (error) {
      console.error('Error getting evaluation:', error);
      res.status(500).json({ message: 'Error al obtener la evaluación' });
    }
  },

  // Obtener evaluaciones de un empleado
  getEmployeeEvaluations: async (req, res) => {
    try {
      const evaluations = await Evaluation.find({
        'evaluatedBy': req.params.id
      })
        .populate('evaluationModel')
        .populate('employee');

      res.json(evaluations);
    } catch (error) {
      console.error('Error getting employee evaluations:', error);
      res.status(500).json({ message: 'Error al obtener las evaluaciones del empleado' });
    }
  },

  // Crear una nueva evaluación
  createEvaluation: async (req, res) => {
    try {


      const employees = req.body.employees;
      let evaluation;
      const populatedEvaluations = [];
      
      employees.forEach(async (employee) => {
  
        evaluation = new Evaluation({ ...req.body, employee: employee, createdBy: req.user.userId });
        await evaluation.save();
  
        populatedEvaluations.push(await Evaluation.findById(evaluation._id)
          .populate('evaluationModel')
          .populate('employee'))
      });

      // const evaluation = new Evaluation(evaluationData);
      // await evaluation.save();


      res.status(201).json(populatedEvaluations);
    } catch (error) {
      console.error('Error creating evaluation:', error);
      res.status(500).json({ 
        message: 'Error al crear la evaluación',
        error: error.message 
      });
    }
  },

  // Actualizar una evaluación
  updateEvaluation: async (req, res) => {
    try {
      const updatedEvaluation = await Evaluation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
        .populate('evaluationModel')
        .populate('employee');

      if (!updatedEvaluation) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }

      res.json(updatedEvaluation);
    } catch (error) {
      console.error('Error updating evaluation:', error);
      res.status(500).json({ message: 'Error al actualizar la evaluación' });
    }
  },

  // Obtener estadísticas de la evaluación
  getEvaluationStats: async (req, res) => {
    try {
      const { id } = req.params;
      const evaluation = await Evaluation.findById(id)
        .populate('modelId')
        .populate('responses.evaluatorId', 'name email');

      if (!evaluation) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }

      const stats = {
        totalEvaluators: evaluation.evaluators.length,
        completedEvaluations: evaluation.completedEvaluators.length,
        averageScores: Object.fromEntries(evaluation.averageScores),
        overallScore: evaluation.overallScore,
        progressPercentage: (evaluation.completedEvaluators.length / evaluation.evaluators.length) * 100
      };

      res.json(stats);
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      res.status(500).json({ 
        message: 'Error al obtener estadísticas',
        error: error.message 
      });
    }
  }
};

module.exports = evaluationController; 