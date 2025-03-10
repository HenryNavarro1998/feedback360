const { body, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validator');

// Validaciones para empleado
const validateEmployee = [
    body('firstName').notEmpty().withMessage('El nombre es requerido'),
    body('lastName').notEmpty().withMessage('El apellido es requerido'),
    body('position').notEmpty().withMessage('El cargo es requerido'),
    body('department').notEmpty().withMessage('El departamento es requerido'),
    handleValidationErrors
  ];

  module.exports = {
    validateEmployee
  };