const Employee = require('../models/employee');
const Evaluation = require('../models/evaluation');
const EvaluationModel = require('../models/evaluation-model');
const mongoose = require('mongoose');

const dashboardController = {
    getStats: async (req, res) => {
        try {
            const userId = new mongoose.Types.ObjectId(req.user.id);
            const userRole = req.user.role;

            console.log('Usuario solicitando estadísticas:', { userId, userRole }); // Debug

            let stats = {};

            switch (userRole) {
                case 'admin':
                    const [totalEmployees, activeEvaluations, evaluationModels] = await Promise.all([
                        Employee.countDocuments(),
                        Evaluation.countDocuments({ status: 'pending' }), // Cambiado a 'pending' para consistencia
                        EvaluationModel.countDocuments({ active: true })
                    ]);

                    console.log('Estadísticas de admin:', { totalEmployees, activeEvaluations, evaluationModels }); // Debug
                    stats = { totalEmployees, activeEvaluations, evaluationModels };
                    break;

                case 'manager':
                    const [teamEmployees, pendingTeamEvaluations] = await Promise.all([
                        Employee.countDocuments({ managerId: userId }),
                        Evaluation.countDocuments({
                            evaluatorId: userId,
                            status: 'pending'
                        })
                    ]);

                    console.log('Estadísticas de manager:', { teamEmployees, pendingTeamEvaluations }); // Debug
                    stats = { teamEmployees, pendingTeamEvaluations };
                    break;

                case 'employee':
                    const pendingEvaluations = await Evaluation.countDocuments({
                        employeeId: userId,
                        status: 'pending'
                    });

                    console.log('Estadísticas de empleado:', { pendingEvaluations }); // Debug
                    stats = { pendingEvaluations };
                    break;

                default:
                    return res.status(403).json({ message: 'Rol no autorizado' });
            }

            console.log('Enviando estadísticas:', stats); // Debug
            res.json(stats);
        } catch (error) {
            console.error('Error detallado en getStats:', error);
            res.status(500).json({ 
                message: 'Error al obtener las estadísticas',
                error: error.message,
                stack: error.stack // Solo para desarrollo
            });
        }
    },
};

module.exports = dashboardController; 