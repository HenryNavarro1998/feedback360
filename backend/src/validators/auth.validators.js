const { body, validationResult } = require('express-validator');
const {handleValidationErrors} = require('../middleware/validator');

const validateRegister = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role')
      .isIn(['admin', 'manager', 'employee'])
      .withMessage('Rol inválido'),
    body('employeeId')
      .notEmpty()
      .withMessage('El ID del empleado es requerido')
      .isMongoId()
      .withMessage('ID de empleado inválido'),
    handleValidationErrors
  ];
  
  // Validaciones para login
  const validateLogin = [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    handleValidationErrors
  ];

  module.exports = {
    validateRegister,
    validateLogin
  };