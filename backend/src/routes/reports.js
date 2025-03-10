const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { auth, authorize } = require('../middleware/auth');

router.get(
  '/employee/:id',
  [auth, authorize('admin', 'manager')],
  reportController.generateEmployeeReport
);

module.exports = router;  