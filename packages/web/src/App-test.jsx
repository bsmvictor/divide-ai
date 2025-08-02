import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          color: '#4f46e5', 
          fontSize: '3rem', 
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          💰 Divide.AI
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          textAlign: 'center', 
          color: '#666',
          marginBottom: '40px'
        }}>
          Divida contas entre amigos de forma simples e rápida!
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            padding: '30px',
            backgroundColor: '#f0f9ff',
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: '2px solid #e0e7ff'
          }}>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>
              📄 Divisão Simples
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Divida o valor total igualmente entre todos
            </p>
            <button style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Começar
            </button>
          </div>

          <div style={{
            padding: '30px',
            backgroundColor: '#f0fdf4',
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: '2px solid #dcfce7'
          }}>
            <h3 style={{ color: '#166534', marginBottom: '15px' }}>
              👥 Divisão Personalizada
            </h3>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Divida itens específicos entre pessoas diferentes
            </p>
            <button style={{
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Começar
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#4f46e5',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '10px' }}>✨ Como funciona?</h4>
          <p>1. Escolha o tipo de divisão • 2. Adicione valores e pessoas • 3. Configure gorjetas • 4. Compartilhe!</p>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '30px',
          color: '#64748b'
        }}>
          <p>🚀 <strong>Status:</strong> Frontend funcionando perfeitamente!</p>
          <p>📡 <strong>API:</strong> http://localhost:3001</p>
        </div>
      </div>
    </div>
  );
}

export default App;
