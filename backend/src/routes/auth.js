const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../validators/auth.validators');
const { auth } = require('../middleware/auth');

// Para debug
// console.log('authController:', authController);
// console.log('authController.me:', authController.me);

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/me', auth, authController.me);

module.exports = router; 