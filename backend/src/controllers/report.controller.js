const Evaluation = require('../models/evaluation');
const Employee = require('../models/employee');
const Feedback = require('../models/feedback');

const reportController = {
  generateEmployeeReport: async (req, res) => {
    try {
      const employeeId = req.params.id;

      // Obtener información del empleado
      const employee = await Employee.findById(employeeId)
        .populate('managerId', 'email');

      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      // Obtener todas las evaluaciones del empleado
      const evaluations = await Evaluation.find({ employeeId })
        .populate('evaluatorId', 'email')
        .sort('-createdAt');

      // Calcular promedios y estadísticas
      const stats = {
        totalEvaluations: evaluations.length,
        averageScore: 0,
        scoresByPeriod: {},
        criteriaAverages: {}
      };

      if (evaluations.length > 0) {
        // Calcular promedio general
        stats.averageScore = evaluations.reduce((acc, eval) => 
          acc + eval.overallScore, 0) / evaluations.length;

        // Calcular promedios por período
        evaluations.forEach(eval => {
          stats.scoresByPeriod[eval.period] = eval.overallScore;
        });

        // Calcular promedios por criterio
        evaluations.forEach(eval => {
          eval.criteria.forEach(criterion => {
            if (!stats.criteriaAverages[criterion.name]) {
              stats.criteriaAverages[criterion.name] = {
                total: 0,
                count: 0
              };
            }
            stats.criteriaAverages[criterion.name].total += criterion.score;
            stats.criteriaAverages[criterion.name].count += 1;
          });
        });

        // Calcular promedios finales por criterio
        Object.keys(stats.criteriaAverages).forEach(criterion => {
          stats.criteriaAverages[criterion] = 
            stats.criteriaAverages[criterion].total / 
            stats.criteriaAverages[criterion].count;
        });
      }

      // Obtener feedback relacionado
      const feedback = await Feedback.find({
        evaluationId: { $in: evaluations.map(e => e._id) }
      }).populate('providerId', 'email');

      res.json({
        employee,
        statistics: stats,
        evaluations,
        feedback
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al generar reporte', 
        error: error.message 
      });
    }
  }
};

module.exports = reportController; 