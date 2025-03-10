const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

// Rutas
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const evaluationRoutes = require('./routes/evaluations');
const evaluationModelRoutes = require('./routes/evaluation-model');
const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/evaluation-models', evaluationModelRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejo de errores del servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} está en uso. Intenta con otro puerto.`);
  } else {
    console.error('Error al iniciar el servidor:', error);
  }
  process.exit(1);
});

module.exports = app; 