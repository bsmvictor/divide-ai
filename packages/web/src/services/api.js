import axios from 'axios';

// URL da API baseada no ambiente
const getApiUrl = () => {
  // Em produção (GitHub Pages), usar API hospedada
  if (import.meta.env.PROD) {
    return import.meta.env.VITE_API_URL || 'https://divide-ai-api.railway.app/api';
  }
  // Em desenvolvimento, usar API local
  return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
};

const API_BASE_URL = getApiUrl();

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
      // Se a API não estiver disponível, simular resposta para demo
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        console.warn('API não disponível, usando dados simulados para demo');
        return simulateCalculation(billData);
      }
      
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
      // Se a API não estiver disponível, simular resposta para demo
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        console.warn('API não disponível, usando dados simulados para demo');
        return simulateCustomCalculation(billData);
      }
      
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

// Funções de simulação para quando a API não estiver disponível
const simulateCalculation = (billData) => {
  const { people, tip = 0, discount = 0 } = billData;
  let subtotal = 0;

  if (billData.items) {
    subtotal = billData.items.reduce((sum, item) => sum + item.price, 0);
  } else {
    subtotal = billData.total;
  }

  const tipAmount = (subtotal * tip) / 100;
  const total = subtotal + tipAmount - discount;
  const perPerson = total / people;

  return {
    success: true,
    data: {
      people,
      perPerson,
      finalTotal: total,
      breakdown: {
        subtotal,
        tip: tipAmount,
        discount,
        total
      },
      items: billData.items || []
    }
  };
};

const simulateCustomCalculation = (billData) => {
  const { people, items, tip = 0, discount = 0 } = billData;
  const personTotals = {};

  // Inicializar totais das pessoas
  people.forEach(person => {
    personTotals[person.id] = {
      name: person.name,
      items: [],
      subtotal: 0,
      tip: 0,
      discount: 0,
      total: 0
    };
  });

  // Calcular itens por pessoa
  items.forEach(item => {
    const pricePerPerson = item.price / item.people.length;
    item.people.forEach(personId => {
      if (personTotals[personId]) {
        personTotals[personId].items.push({
          name: item.name,
          price: pricePerPerson,
          sharedWith: item.people.length
        });
        personTotals[personId].subtotal += pricePerPerson;
      }
    });
  });

  // Calcular gorjeta e desconto proporcionais
  const totalSubtotal = Object.values(personTotals).reduce((sum, person) => sum + person.subtotal, 0);
  
  Object.values(personTotals).forEach(person => {
    const proportion = person.subtotal / totalSubtotal;
    person.tip = (totalSubtotal * tip / 100) * proportion;
    person.discount = discount * proportion;
    person.total = person.subtotal + person.tip - person.discount;
  });

  const finalTotal = Object.values(personTotals).reduce((sum, person) => sum + person.total, 0);

  return {
    success: true,
    data: {
      personTotals,
      finalTotal
    }
  };
};

export default api;
