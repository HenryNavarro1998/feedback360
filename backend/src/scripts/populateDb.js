require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker/locale/es');
const User = require('../models/User');
const Employee = require('../models/employee');

// Configuración
const TOTAL_EMPLOYEES = 10;
const TOTAL_MANAGERS = 3;
const DEFAULT_PASSWORD = 'qwe123';

const departments = [
  'Engineering',
  'Human Resources',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'Customer Support'
];

const positions = {
  Engineering: ['Software Developer', 'Senior Developer', 'Tech Lead', 'QA Engineer', 'DevOps Engineer'],
  'Human Resources': ['HR Specialist', 'Recruiter', 'HR Manager', 'Training Coordinator'],
  Sales: ['Sales Representative', 'Account Manager', 'Sales Manager', 'Business Developer'],
  Marketing: ['Marketing Specialist', 'Content Manager', 'Digital Marketing Manager', 'Brand Manager'],
  Finance: ['Financial Analyst', 'Accountant', 'Finance Manager', 'Controller'],
  Operations: ['Operations Manager', 'Project Manager', 'Business Analyst', 'Process Manager'],
  'Customer Support': ['Support Specialist', 'Customer Success Manager', 'Support Team Lead']
};

const createEmployees = async (count) => {
  const employees = [];

  for (let i = 0; i < count; i++) {
    const department = faker.helpers.arrayElement(departments);
    const position = faker.helpers.arrayElement(positions[department]);

    const employee = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        provider: 'company.com'
      }),
      phone: faker.phone.number(),
      position,
      department,
      status: 'active'
    };

    employees.push(employee);
  }

  return await Employee.create(employees);
};

const createUsers = async (employees, managerCount) => {
  const users = [];
  const managers = [];

  // Crear usuarios managers
  for (let i = 0; i < managerCount; i++) {
    const employee = employees[i];
    const user = new User({
      email: faker.internet.email({
        firstName: employee.firstName,
        lastName: employee.lastName,
        provider: 'company.com'
      }),
      password: DEFAULT_PASSWORD,
      role: 'evaluator',
      employeeId: employee._id
    })
    await user.save();
    users.push(user);
    managers.push(user);
  }

  // Crear usuarios empleados para el resto
  for (let i = managerCount; i < employees.length; i++) {
    const employee = employees[i];
    const user = new User({
      email: faker.internet.email({
        firstName: employee.firstName,
        lastName: employee.lastName,
        provider: 'company.com'
      }),
      password: DEFAULT_PASSWORD,
      role: 'employee',
      employeeId: employee._id
    });
    await user.save();
    users.push(user);
  }

  return { users, managers };
};

const assignManagers = async (employees, managers) => {
  // Distribuir empleados entre los managers
  const managerIds = managers.map(m => m._id);
  
  for (let i = TOTAL_MANAGERS; i < employees.length; i++) {
    const managerId = faker.helpers.arrayElement(managerIds);
    await Employee.findByIdAndUpdate(employees[i]._id, { managerId });
  }
};

const populateDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017");
    console.log('Conectado a MongoDB');

    // Verificar si ya existen datos
    const existingCount = await Employee.countDocuments();
    if (existingCount > 0) {
      console.log('\n¡Advertencia! La base de datos ya contiene registros.');
      console.log('Esto agregará más registros sin eliminar los existentes.');
      // Aquí podrías agregar una pausa para confirmación si lo deseas
    }

    // Crear empleados
    console.log('\nCreando empleados...');
    const employees = await createEmployees(TOTAL_EMPLOYEES);
    console.log(`${employees.length} empleados creados`);

    // Crear usuarios y managers
    console.log('\nCreando usuarios...');
    const { users, managers } = await createUsers(employees, TOTAL_MANAGERS);
    console.log(`${users.length} usuarios creados (${managers.length} managers)`);

    // Asignar managers a empleados
    console.log('\nAsignando managers...');
    await assignManagers(employees, managers);
    console.log('Managers asignados exitosamente');

    // Mostrar credenciales
    console.log('\nCredenciales de usuarios creados:');
    users.forEach(user => {
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${DEFAULT_PASSWORD}`);
      console.log(`Role: ${user.role}`);
      console.log('---');
    });

    await mongoose.disconnect();
    console.log('\nProceso completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

populateDb(); 