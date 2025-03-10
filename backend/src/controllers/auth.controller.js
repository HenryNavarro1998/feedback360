const User = require('../models/user');
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
  // Registro de usuarios
  register: async (req, res) => {
    try {
      const { email, password, role, employeeId } = req.body;

      // Verificar si el usuario ya existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Verificar si el empleado existe
      const employeeExists = await Employee.findById(employeeId);
      if (!employeeExists) {
        return res.status(400).json({ message: 'El empleado no existe' });
      }

      // Verificar si el empleado ya tiene un usuario asociado
      const employeeHasUser = await User.findOne({ employeeId });
      if (employeeHasUser) {
        return res.status(400).json({ message: 'El empleado ya tiene un usuario asociado' });
      }

      // Crear nuevo usuario
      const user = new User({
        email,
        password,
        role,
        employeeId
      });

      await user.save();

      // Generar token
      const token = jwt.sign(
        { userId: user._id, role: user.role, employeeId: user.employeeId },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  // Login de usuarios
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuario y poblar datos del empleado
      const user = await User.findOne({ email })
        .populate('employeeId', 'firstName lastName position department');

      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Verificar contraseña
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar token
      const token = jwt.sign(
        { 
          userId: user._id, 
          role: user.role, 
          employeeId: user.employeeId 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          email: user.email,
          role: user.role,
          employee: user.employeeId
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
  },

  me: async (req, res) => {
    try {
      const user = await User.findById(req.user._id)
        .select('-password')
        .populate('employeeId', 'firstName lastName position department');

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({
        user: {
          email: user.email,
          role: user.role,
          employee: user.employeeId
        }
      });
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ 
        message: 'Error al obtener información del perfil',
        error: error.message 
      });
    }
  }
};

module.exports = authController; 