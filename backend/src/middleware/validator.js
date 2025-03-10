const { body, validationResult } = require('express-validator');

// Función para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const employeeValidator = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('El apellido es requerido')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email no es válido'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('El teléfono es requerido')
    .matches(/^\+?[0-9]{8,15}$/).withMessage('El teléfono no es válido'),
  
  body('position')
    .trim()
    .notEmpty().withMessage('El cargo es requerido'),
  
  body('department')
    .trim()
    .notEmpty().withMessage('El departamento es requerido'),
  
  body('managerId')
    .optional()
    .isMongoId().withMessage('El ID del manager no es válido')
];

module.exports = {
  handleValidationErrors,
  employeeValidator
}; 