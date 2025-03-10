const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { auth, authorize } = require('../middleware/auth');
const { validateEmployee } = require('../validators/employees.validators');
const Employee = require('../models/employee');
const User = require('../models/user');

router.get('/', auth, employeeController.getAllEmployees);
router.get('/:id', auth, employeeController.getEmployeeById);
router.post(
  '/',
  [auth, authorize('admin', 'manager'), validateEmployee],
  employeeController.createEmployee
);
router.put(
  '/:id',
  [auth, authorize('admin', 'manager'), validateEmployee],
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Encontrar y actualizar el empleado
      const employee = await Employee.findByIdAndUpdate(
        id,
        { ...updates },
        { new: true, runValidators: true }
      );

      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }

      // También actualizar el usuario asociado si existe
      if (employee.userId) {
        await User.findByIdAndUpdate(
          employee.userId,
          { status: updates.status },
          { new: true }
        );
      }

      res.json(employee);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      res.status(500).json({ message: 'Error al actualizar el empleado', error: error.message });
    }
  }
);

module.exports = router; 