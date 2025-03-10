const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Asegurarse de que el usuario tenga un employeeId
        if (!req.user.employeeId) {
            return res.status(403).json({ 
                message: 'Usuario no tiene un empleado asociado',
                userId: req.user.id
            });
        }

        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'No tiene permiso para realizar esta acción' 
            });
        }
        next();
    };
};

module.exports = { auth, authorize }; 