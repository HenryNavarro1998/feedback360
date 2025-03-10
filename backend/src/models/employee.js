const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Índices para mejorar búsquedas
employeeSchema.index({ lastName: 1, firstName: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ managerId: 1 });
employeeSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Employee', employeeSchema); 