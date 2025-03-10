const User = require('../models/user');
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');

// Exportar directamente las funciones del controlador como middlewares
module.exports = {
  getEvaluators: function getEvaluatorsMiddleware(req, res, next) {
    console.log('Accediendo a getEvaluators');
    return User.find({
      role: { $in: ['admin', 'manager'] }
    })
    .select('name email role')
    .exec()
    .then(evaluators => {
      console.log('Evaluadores encontrados:', evaluators);
      return res.json(evaluators);
    })
    .catch(error => {
      console.error('Error al obtener evaluadores:', error);
      return res.status(500).json({ 
        message: 'Error al obtener evaluadores', 
        error: error.message 
      });
    });
  },

  // Obtener todos los usuarios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
        .select('-password')
        .populate('employeeId', 'firstName lastName position department');
      res.json(users);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener usuarios',
        error: error.message 
      });
    }
  },

  // Obtener un usuario por ID
  getUserById: async (req, res) => {
    try {
      const result = await User.findById(req.params.id)
        .select('-password')
        .populate('employeeId');
      
      if (!result) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener usuario',
        error: error.message 
      });
    }
  },

  // Crear un nuevo usuario
  createUser: async (req, res) => {
    try {
      const { email, password, role, employee } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }

      // Crear o actualizar el empleado
      let employeeId;
      if (employee._id) {
        // Actualizar empleado existente
        await Employee.findByIdAndUpdate(employee._id, employee);
        employeeId = employee._id;
      } else {
        // Crear nuevo empleado
        const newEmployee = new Employee(employee);
        const savedEmployee = await newEmployee.save();
        employeeId = savedEmployee._id;
      }

      // Crear usuario
      const result = new User({
        email,
        password,
        role,
        employeeId
      });

      await result.save();

      // Obtener usuario con datos del empleado
      const savedUser = await User.findById(result._id)
        .select('-password')
        .populate('employeeId');

      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear usuario',
        error: error.message 
      });
    }
  },

  // Actualizar un usuario
  updateUser: async (req, res) => {
    try {
      const { email, password, role, employee } = req.body;
      const userId = req.params.id;

      // Actualizar empleado
      if (employee) {
        await Employee.findByIdAndUpdate(employee._id, employee);
      }

      // Actualizar usuario
      const updateData = {
        email,
        role
      };

      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
      }

      const result = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      )
      .select('-password')
      .populate('employeeId');

      if (!result) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar usuario',
        error: error.message 
      });
    }
  },

  // Eliminar un usuario
  deleteUser: async (req, res) => {
    try {
      const result = await User.findById(req.params.id);
      
      if (!result) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      // No eliminar el empleado, solo el usuario
      await User.findByIdAndDelete(req.params.id);

      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al eliminar usuario',
        error: error.message 
      });
    }
  }
};