import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para logging em desenvolvimento
if (import.meta.env.DEV) {
  api.interceptors.request.use(
    (config) => {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('❌ API Request Error:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      console.log('✅ API Response:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error('❌ API Response Error:', error.response?.status, error.config?.url);
      return Promise.reject(error);
    }
  );
}

export const billService = {
  /**
   * Calcula divisão simples da conta
   */
  calculateBill: async (billData) => {
    try {
      const response = await api.post('/bills/calculate', billData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 
        'Erro ao calcular a conta. Verifique sua conexão.'
      );
    }
  },

  /**
   * Calcula divisão personalizada
   */
  calculateCustomBill: async (billData) => {
    try {
      const response = await api.post('/bills/calculate-custom', billData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 
        'Erro ao calcular a divisão personalizada. Verifique sua conexão.'
      );
    }
  },

  /**
   * Verifica se a API está funcionando
   */
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API não está respondendo');
    }
  }
};

export default api;
