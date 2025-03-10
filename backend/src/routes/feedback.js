const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const { auth } = require('../middleware/auth');

router.post(
  '/',
  [auth],
  feedbackController.createFeedback
);

router.get(
  '/evaluation/:evaluationId',
  auth,
  feedbackController.getEvaluationFeedback
);

module.exports = router; 