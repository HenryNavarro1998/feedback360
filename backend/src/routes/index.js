const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const employeeRoutes = require('./employee.routes');
const evaluationRoutes = require('./evaluation.routes');
const evaluationModelRoutes = require('./evaluation-model');
const userRoutes = require('./user');

router.use('/auth', authRoutes);
router.use('/employees', employeeRoutes);
router.use('/evaluations', evaluationRoutes);
router.use('/evaluation-models', evaluationModelRoutes);
// router.use('/users', userRoutes);

module.exports = router; 