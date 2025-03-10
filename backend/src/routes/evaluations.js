const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluation.controller');
const { auth, authorize } = require('../middleware/auth');
const Evaluation = require('../models/evaluation');

router.get('/:id', auth, evaluationController.getEvaluation);

router.get(
  '/', 
  [auth, authorize('admin', 'manager')], 
  evaluationController.getAllEvaluations
);

router.post(
  '/',
  [auth, authorize('admin', 'manager')],
  evaluationController.createEvaluation
);

router.put(
  '/:id',
  [auth, authorize('admin', 'manager')],
  evaluationController.updateEvaluation
);

router.get(
  '/employee/:id',
  auth,
  evaluationController.getEmployeeEvaluations
);

module.exports = router; 