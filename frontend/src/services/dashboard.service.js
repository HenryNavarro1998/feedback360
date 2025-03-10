import axios from 'axios';
import authService from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

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

const dashboardService = {
  getStats: async () => {
    try {
      const response = await api.get('dashboard/stats');
      console.log('Respuesta de getStats:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas del dashboard:', error);
      throw error;
    }
  },

  getEvaluationStats: async (evaluationId) => {
    try {
      const response = await api.get(`evaluations/${evaluationId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas de evaluación:', error);
      throw error;
    }
  },

  getRecentEvaluations: async () => {
    try {
      const user = authService.getCurrentUser()
      console.log('Usuario actual:', user);
      const response = await api.get(`evaluations/employee/${user.employee._id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo evaluaciones recientes:', error);
      throw error;
    }
  }
};

export default dashboardService; 