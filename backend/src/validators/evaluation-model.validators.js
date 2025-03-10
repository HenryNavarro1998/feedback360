const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validator');
const createEvaluationModelValidator = [
    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isString()
        .withMessage('El nombre debe ser texto'),
    
    body('description')
        .optional()
        .isString()
        .withMessage('La descripción debe ser texto'),

    body('questions')
        .isArray({min: 1})
        .withMessage('Las preguntas deben ser un array')
        .notEmpty()
        .withMessage('Debe incluir al menos una pregunta'),

    body('questions.*.question')
        .notEmpty()
        .withMessage('La pregunta es requerida')
        .isString()
        .withMessage('La pregunta debe ser texto'),

    body('questions.*.options')
        .isArray()
        .withMessage('Las opciones deben ser un array')
        .notEmpty()
        .withMessage('Debe incluir al menos una opción'),

    body('questions.*.options.*.option')
        .notEmpty()
        .withMessage('El texto de la opción es requerido')
        .isString()
        .withMessage('La opción debe ser texto'),

    body('questions.*.options.*.score')
        .notEmpty()
        .withMessage('El puntaje es requerido')
        .isNumeric()
        .withMessage('El puntaje debe ser un número'),

    body('questions.*.required')
        .optional()
        .isBoolean()
        .withMessage('El campo required debe ser booleano'),
    handleValidationErrors
];

module.exports = {
    createEvaluationModelValidator
};