const Feedback = require('../models/feedback');

const feedbackController = {
  // Crear nuevo feedback
  createFeedback: async (req, res) => {
    try {
      const { evaluationId, content, type } = req.body;

      const feedback = new Feedback({
        evaluationId,
        providerId: req.user.userId,
        content,
        type
      });

      await feedback.save();

      res.status(201).json({
        message: 'Feedback enviado exitosamente',
        feedback
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear feedback', error: error.message });
    }
  },

  // Obtener feedback de una evaluación
  getEvaluationFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.find({ evaluationId: req.params.evaluationId })
        .populate('providerId', 'email')
        .sort('-createdAt');

      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener feedback', error: error.message });
    }
  }
};

module.exports = feedbackController; 