# 💰 Divide.AI

Uma aplicação web moderna para divisão de contas entre amigos, desenvolvida com React e Node.js.

## 🚀 Funcionalidades

- **Divisão Simples**: Divide o valor total igualmente entre todos os participantes
- **Divisão Personalizada**: Permite que diferentes pessoas paguem por itens específicos
- **Cálculo de Gorjetas**: Adiciona gorjetas em porcentagem
- **Descontos**: Aplica descontos ao valor total
- **Compartilhamento**: Compartilha o resultado via área de transferência ou Web Share API
- **Interface Moderna**: Design limpo e responsivo com Material-UI

## 🏗️ Arquitetura

Este projeto utiliza uma arquitetura de monorepo com as seguintes tecnologias:

### Backend (API)
- **Node.js** com Express
- **Arquitetura em camadas** (Controllers, Services, Utils)
- **Validação de dados** robusta
- **Rate limiting** e segurança
- **CORS** configurado para frontend

### Frontend (Web)
- **React 18** com Vite
- **Material-UI (MUI)** para componentes
- **React Router** para navegação
- **Axios** para comunicação com API
- **React Hot Toast** para notificações
- **Design responsivo**

## 📱 Screenshots

*Em breve - adicione screenshots da aplicação aqui*

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/divide-ai.git
cd divide-ai
```

### 2. Instale as dependências

```bash
# Instala dependências do monorepo e de todos os pacotes
npm run install:all
```

### 3. Configure as variáveis de ambiente

**API** - Crie um arquivo `.env` na pasta `packages/api`:
```env
PORT=3001
NODE_ENV=development
```

**Web** - Crie um arquivo `.env` na pasta `packages/web`:
```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Execute o projeto

#### Opção 1: Executar tudo junto
```bash
npm run dev
```

#### Opção 2: Executar separadamente

**Terminal 1 - API:**
```bash
npm run dev:api
```

**Terminal 2 - Web:**
```bash
npm run dev:web
```

### 5. Acesse a aplicação

- **Web**: http://localhost:3000
- **API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📚 Documentação da API

A documentação completa da API está disponível em: [`packages/api/API_DOCUMENTATION.md`](packages/api/API_DOCUMENTATION.md)

### Endpoints principais:

- `GET /health` - Health check
- `POST /api/bills/calculate` - Divisão simples
- `POST /api/bills/calculate-custom` - Divisão personalizada

## 🧪 Testes

### Testar a API
```bash
npm run test:api
```

## 📦 Build e Deploy

### Build completo
```bash
npm run build
```

### Build separado
```bash
# API
npm run build:api

# Web
npm run build:web
```

### Preview da build web
```bash
npm run preview
```

## 🔧 Scripts Disponíveis

### Raiz do projeto
- `npm run dev` - Executa API e Web simultaneamente
- `npm run dev:api` - Executa apenas a API
- `npm run dev:web` - Executa apenas o Web
- `npm run build` - Build completo (API + Web)
- `npm run install:all` - Instala todas as dependências
- `npm run clean` - Limpa node_modules e builds

### API (`packages/api`)
- `npm run dev` - Executa em modo desenvolvimento
- `npm start` - Executa em modo produção
- `npm run build` - Build do projeto

### Web (`packages/web`)
- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build

## 🏗️ Estrutura do Projeto

```
divide-ai/
├── packages/
│   ├── api/                    # Backend Node.js
│   │   ├── src/
│   │   │   ├── controllers/    # Controladores da API
│   │   │   ├── services/       # Lógica de negócio
│   │   │   ├── utils/          # Utilitários
│   │   │   └── server.js       # Servidor principal
│   │   └── package.json
│   │
│   ├── web/                    # Frontend React
│   │   ├── src/
│   │   │   ├── components/     # Componentes reutilizáveis
│   │   │   ├── pages/          # Páginas da aplicação
│   │   │   ├── services/       # Serviços (API calls)
│   │   │   └── utils/          # Utilitários
│   │   ├── index.html          # HTML principal
│   │   └── package.json
│   │
├── package.json                # Configuração do monorepo
└── README.md
```

## 🎯 Como Usar

### Divisão Simples
1. Acesse http://localhost:3000
2. Clique em "Divisão Simples"
3. Escolha entre inserir o valor total ou adicionar itens individuais
4. Informe o número de pessoas
5. Adicione gorjeta e desconto (opcional)
6. Clique em "Calcular Divisão"
7. Compartilhe o resultado

### Divisão Personalizada
1. Clique em "Divisão Personalizada"
2. Adicione as pessoas que participarão
3. Adicione os itens e selecione quem vai dividir cada um
4. Configure gorjeta e desconto (opcional)
5. Calcule e compartilhe o resultado

## 🌐 Deploy

### Frontend (Vercel/Netlify)
```bash
# Build do frontend
npm run build:web

# Os arquivos estarão em packages/web/dist
```

### Backend (Railway/Heroku)
```bash
# Build do backend
npm run build:api

# Configure as variáveis de ambiente:
# PORT=3001
# NODE_ENV=production
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Victor Boaventura**
- GitHub: [@victorboaventura](https://github.com/victorboaventura)
- LinkedIn: [Victor Boaventura](https://linkedin.com/in/victorboaventura)

## 🙏 Agradecimentos

- [Material-UI](https://mui.com/) pelos componentes UI
- [Vite](https://vitejs.dev/) pela ferramenta de build
- [Express.js](https://expressjs.com/) pelo framework web

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
