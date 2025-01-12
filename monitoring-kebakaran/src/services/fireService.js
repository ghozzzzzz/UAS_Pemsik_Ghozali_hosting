import api from '../utils/axios';

export const fireService = {
  getAllFires: async () => {
    try {
      const response = await api.get('/fire');
      return response.data;
    } catch (error) {
      console.error('Error fetching fires:', error);
      throw error;
    }
  },

  createFire: async (fireData) => {
    try {
      const response = await api.post('/fire', fireData);
      return response.data;
    } catch (error) {
      console.error('Error creating fire:', error);
      throw error;
    }
  },

  updateFire: async (id, fireData) => {
    try {
      const response = await api.put(`/fire/${id}`, fireData);
      return response.data;
    } catch (error) {
      console.error('Error updating fire:', error);
      throw error;
    }
  },

  deleteFire: async (id) => {
    try {
      const response = await api.delete(`/fire/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting fire:', error);
      throw error;
    }
  }
};
