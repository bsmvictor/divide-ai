# 🚀 Guia de Início Rápido - Divide.AI

## ⚡ Setup em 3 passos

### 1. Clone e configure
```bash
git clone https://github.com/seu-usuario/divide-ai.git
cd divide-ai
node setup.js
```

### 2. Execute a aplicação
```bash
npm run dev
```

### 3. Abra no seu celular
- Instale o app **Expo Go** no seu celular
- Escaneie o QR code que aparece no terminal
- Pronto! 🎉

## 📱 Como usar

### Divisão Simples
1. **Toque em "Divisão Simples"**
2. **Escolha o método:**
   - **Valor Total**: Digite o valor total da conta
   - **Por Itens**: Adicione cada item individualmente
3. **Configure:**
   - Número de pessoas
   - Gorjeta (opcional)
   - Desconto (opcional)
4. **Toque em "Calcular Divisão"**
5. **Compartilhe o resultado**

### Divisão Personalizada
1. **Toque em "Divisão Personalizada"**
2. **Adicione as pessoas** que vão participar
3. **Para cada item:**
   - Digite nome e preço
   - Selecione quem vai dividir
   - Toque em "Adicionar Item"
4. **Configure gorjeta e desconto** (opcional)
5. **Toque em "Calcular Divisão"**
6. **Veja quanto cada pessoa deve pagar**

## 🧪 Testando a API

```bash
# Em outro terminal, teste a API
node test-api.js
```

## 🔧 Comandos úteis

```bash
# Executar apenas a API
npm run dev:api

# Executar apenas o Mobile
npm run dev:mobile

# Verificar se a API está funcionando
curl http://localhost:3001/health

# Instalar todas as dependências
npm run install:all
```

## 🌐 URLs importantes

- **API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Documentação**: [packages/api/API_DOCUMENTATION.md](packages/api/API_DOCUMENTATION.md)

## 🆘 Problemas comuns

### "Expo CLI não encontrado"
```bash
npm install -g @expo/cli
```

### "Porta 3001 já está em uso"
```bash
# Mude a porta no arquivo packages/api/.env
PORT=3002
```

### "Não consigo conectar no celular"
- Certifique-se que o celular e computador estão na mesma rede Wi-Fi
- Tente usar o túnel do Expo: `expo start --tunnel`

## 📚 Próximos passos

1. **Personalize o design** editando `packages/mobile/src/utils/theme.js`
2. **Adicione novas funcionalidades** seguindo a arquitetura existente
3. **Configure deploy** para produção
4. **Adicione testes** automatizados

---

💡 **Dica**: Use o comando `npm run dev` para desenvolvimento. Ele inicia API e Mobile automaticamente!
