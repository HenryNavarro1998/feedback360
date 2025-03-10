const Employee = require('../models/employee');
const User = require('../models/user');

const employeeController = {
  // Obtener todos los empleados
  getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.find()
        .populate('managerId', 'firstName lastName');
      res.json(employees);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener empleados',
        error: error.message 
      });
    }
  },

  // Obtener un empleado por ID
  getEmployeeById: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id)
        .populate('managerId', 'firstName lastName');
      
      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      
      res.json(employee);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al obtener empleado',
        error: error.message 
      });
    }
  },

  // Crear un nuevo empleado
  createEmployee: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, position, department, managerId } = req.body;

      // Verificar si ya existe un empleado con ese email
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(400).json({ message: 'Ya existe un empleado con ese email' });
      }

      // Verificar si ya existe un usuario con ese email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
      }

      const employee = new Employee({
        firstName,
        lastName,
        email,
        phone,
        position,
        department,
        managerId
      });

      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al crear empleado',
        error: error.message 
      });
    }
  },

  // Actualizar un empleado
  updateEmployee: async (req, res) => {
    try {
      const { firstName, lastName, email, phone, position, department, managerId } = req.body;
      const employeeId = req.params.id;

      // Obtener el empleado actual
      const currentEmployee = await Employee.findById(employeeId);
      if (!currentEmployee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      // Si el email está cambiando, verificar que no exista
      if (email !== currentEmployee.email) {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
          return res.status(400).json({ message: 'Ya existe un empleado con ese email' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: 'Ya existe un usuario con ese email' });
        }

        // Actualizar el email en el usuario asociado si existe
        await User.findOneAndUpdate(
          { employeeId: employeeId },
          { email: email }
        );
      }

      const employee = await Employee.findByIdAndUpdate(
        employeeId,
        {
          firstName,
          lastName,
          email,
          phone,
          position,
          department,
          managerId
        },
        { new: true }
      ).populate('managerId', 'firstName lastName');

      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      res.json(employee);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al actualizar empleado',
        error: error.message 
      });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      // Verificar si el empleado tiene un usuario asociado
      const user = await User.findOne({ employeeId: req.params.id });
      if (user) {
        return res.status(400).json({ 
          message: 'No se puede eliminar el empleado porque tiene un usuario asociado' 
        });
      }

      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error al eliminar empleado',
        error: error.message 
      });
    }
  }
};

module.exports = employeeController; 