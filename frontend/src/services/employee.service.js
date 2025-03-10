import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const employeeService = {
  async getAllEmployees() {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getEmployeeById(id) {
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createEmployee(employeeData) {
    try {
      const response = await axios.post(`${API_URL}/employees`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error al crear empleado:', error);
      throw error;
    }
  },

  async updateEmployee(id, employeeData) {
    if (!id) {
      throw new Error('ID de empleado no proporcionado');
    }
    try {
      const response = await axios.put(`${API_URL}/employees/${id}`, {
        ...employeeData,
        status: employeeData.status || 'active'
      });
      
      if (!response.data) {
        throw new Error('No se recibieron datos del servidor');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      throw error;
    }
  },

  async deleteEmployee(id) {
    try {
      const response = await axios.delete(`${API_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default employeeService; 