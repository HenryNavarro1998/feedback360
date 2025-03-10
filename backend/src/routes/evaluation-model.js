const express = require('express');
const router = express.Router();
const evaluationModelController = require('../controllers/evaluation-model.controller');
const { auth } = require('../middleware/auth');

// Rutas para modelos de evaluación
router.get('/', auth, evaluationModelController.getEvaluationModels);
router.get('/:id', auth, evaluationModelController.getEvaluationModelById);
router.post('/', auth, evaluationModelController.createEvaluationModel);
router.put('/:id', auth, evaluationModelController.updateEvaluationModel);
router.delete('/:id', auth, evaluationModelController.deleteEvaluationModel);

module.exports = router;
