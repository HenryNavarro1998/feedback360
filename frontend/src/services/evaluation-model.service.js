import api from './api';

const evaluationModelService = {
  getAllModels: async () => {
    try {
      const response = await api.get('/api/evaluation-models');
      console.log('Modelos recibidos:', response.data); // Para debug
      return response.data;
    } catch (error) {
      console.error('Error getting evaluation models:', error);
      throw error;
    }
  },

  getModel: async (id) => {
    try {
      const response = await api.get(`/api/evaluation-models/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting evaluation model:', error);
      throw error;
    }
  },

  createModel: async (modelData) => {
    try {
      const response = await api.post('/api/evaluation-models', modelData);
      return response.data;
    } catch (error) {
      console.error('Error creating evaluation model:', error);
      throw error;
    }
  },

  updateModel: async (id, modelData) => {
    try {
      const response = await api.put(`/api/evaluation-models/${id}`, modelData);
      return response.data;
    } catch (error) {
      console.error('Error updating evaluation model:', error);
      throw error;
    }
  },

  deleteModel: async (id) => {
    try {
      const response = await api.delete(`/api/evaluation-models/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting evaluation model:', error);
      throw error;
    }
  }
};

export default evaluationModelService; 