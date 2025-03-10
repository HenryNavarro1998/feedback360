require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');

const createAdmin = async () => {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017");
    console.log('Conectado a MongoDB');

    // Crear empleado admin
    const adminEmployee = new Employee({
      firstName: 'Admin',
      lastName: 'System',
      position: 'System Administrator',
      department: 'IT',
      phone: '1234567890',
      status: 'active',
      email: 'admin@system.com',
    });

    const savedEmployee = await adminEmployee.save();
    console.log('Empleado admin creado');

    // Crear usuario admin
    const adminUser = new User({
      email: process.env.ADMIN_EMAIL || 'admin@system.com',
      password: process.env.ADMIN_PASSWORD || 'admin123456',
      role: 'admin',
      employeeId: savedEmployee._id
    });

    await adminUser.save();
    console.log('Usuario admin creado exitosamente');
    console.log('Email:', adminUser.email);
    console.log('Password:', process.env.ADMIN_PASSWORD || 'admin123456');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error al crear admin:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin(); 