const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testando API do Divide.AI...\n');

  try {
    // Teste 1: Health Check
    console.log('1. Testando Health Check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', healthResponse.data);

    // Teste 2: Divisão Simples
    console.log('\n2. Testando Divisão Simples...');
    const simpleResponse = await axios.post(`${API_BASE}/api/bills/calculate`, {
      total: 100,
      people: 4,
      tip: 10,
      discount: 5
    });
    console.log('✅ Divisão Simples:', {
      total: simpleResponse.data.data.finalTotal,
      perPerson: simpleResponse.data.data.perPerson
    });

    // Teste 3: Divisão Personalizada
    console.log('\n3. Testando Divisão Personalizada...');
    const customResponse = await axios.post(`${API_BASE}/api/bills/calculate-custom`, {
      items: [
        {
          name: 'Pizza',
          price: 50,
          people: ['1', '2']
        },
        {
          name: 'Refrigerante',
          price: 10,
          people: ['1']
        }
      ],
      people: [
        { id: '1', name: 'João' },
        { id: '2', name: 'Maria' }
      ],
      tip: 10
    });
    console.log('✅ Divisão Personalizada:', {
      total: customResponse.data.data.finalTotal,
      pessoas: Object.keys(customResponse.data.data.personTotals).length
    });

    console.log('\n🎉 Todos os testes passaram! API funcionando corretamente.');

  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  testAPI();
}

module.exports = testAPI;
