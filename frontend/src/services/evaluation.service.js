import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear una instancia de axios con configuración base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Si no hay token, verificar si el usuario está autenticado
      if (authService.isAuthenticated()) {
        throw new Error('Token no encontrado pero usuario autenticado');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido o expirado
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const evaluationService = {
  // Modelos de Evaluación
  async getAllEvaluationModels() {
    try {
      const response = await api.get('/evaluation-models');
      console.log('Respuesta de modelos completa:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('Error getting evaluation models:', error);
      throw error;
    }
  },

  async createEvaluationModel(modelData) {
    try {
      const response = await api.post('/evaluation-models', modelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateEvaluationModel(id, modelData) {
    try {
      const response = await api.put(`/evaluation-models/${id}`, modelData);
      return response.data;
    } catch (error) {
      console.error('Error updating evaluation model:', error.response?.data || error);
      throw error;
    }
  },

  // Evaluaciones
  async getAllEvaluations() {
    try {
      const response = await api.get('/evaluations');
      return response.data;
    } catch (error) {
      console.error('Error getting evaluations:', error.response?.data || error);
      throw error;
    }
  },

  async createEvaluation(evaluationData) {
    try {
      // Verificar autenticación antes de hacer la petición
      if (!authService.isAuthenticated()) {
        throw new Error('Usuario no autenticado');
      }

      console.log('Token actual:', authService.getToken()); // Debug
      console.log('Datos a enviar:', evaluationData); // Debug

      const response = await api.post('/evaluations', evaluationData);
      return response.data;
    } catch (error) {
      console.error('Error creating evaluation:', error);
      console.error('Response data:', error.response?.data); // Debug
      throw error;
    }
  },

  async updateEvaluation(id, evaluationData) {
    try {
      const response = await api.put(`/evaluations/${id}`, evaluationData);
      return response.data;
    } catch (error) {
      console.error('Error updating evaluation:', error.response?.data || error);
      throw error;
    }
  },

  async getEvaluation(id) {
    try {
      console.log('Fetching evaluation with ID:', id); // Debug
      const response = await api.get(`/evaluations/${id}`);
      console.log('Evaluation response:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('Error getting evaluation:', error.response?.data || error);
      throw error;
    }
  },

  async getAvailableModels() {
    try {
      const response = await api.get('/evaluation-models');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAvailableEmployees() {
    try {
      const response = await api.get('/employees');
      console.log('Respuesta de empleados:', response.data); // Debug
      return response.data;
    } catch (error) {
      console.error('Error getting employees:', error);
      throw error;
    }
  },

  async getAvailableEvaluators() {
    try {
      const response = await api.get('/users/evaluators');
      return response.data;
    } catch (error) {
      console.error('Error getting evaluators:', error.response?.data || error);
      if (error.response?.status === 404) {
        throw new Error('No se pudo encontrar el endpoint de evaluadores');
      }
      throw error;
    }
  },

  submitResponse: async (evaluationId, responseData) => {
    try {
      const response = await api.post(`/evaluations/${evaluationId}/response`, responseData);
      return response.data;
    } catch (error) {
      console.error('Error submitting evaluation response:', error);
      throw error;
    }
  },

  getParticipantResponse: async (evaluationId, participantId) => {
    try {
      const response = await api.get(`/evaluations/${evaluationId}/responses/${participantId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting participant response:', error);
      throw error;
    }
  },

  submitProgress: async (evaluationId, data) => {
    try {
      const response = await api.post(`/evaluations/${evaluationId}/progress`, data);
      return response.data;
    } catch (error) {
      console.error('Error saving evaluation progress:', error);
      if (error.response?.status === 403) {
        console.error('Detalles del error 403:', error.response.data);
      }
      throw error;
    }
  },

  completeEvaluation: async (evaluationId, data) => {
    try {
      const response = await api.post(`/evaluations/${evaluationId}/complete`, data);
      return response.data;
    } catch (error) {
      console.error('Error completing evaluation:', error);
      throw error;
    }
  },

  async getEmployees() {
    const response = await api.get('/employees');
    return response.data;
  },

  async getEvaluationModels() {
    const response = await api.get('/evaluation-models');
    return response.data;
  },

  async createEvaluation(evaluationData) {
    const response = await api.post('/evaluations', evaluationData);
    return response.data;
  }
};

export default evaluationService; 