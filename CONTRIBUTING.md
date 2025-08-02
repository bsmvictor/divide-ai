# 🤝 Contribuindo para o Divide.AI

Obrigado por considerar contribuir para o Divide.AI! Este documento fornece diretrizes para contribuições.

## 🚀 Como Contribuir

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU_USUARIO/divide-ai.git
cd divide-ai
```

### 2. Configurar Ambiente
```bash
# Instalar dependências
npm run install:all

# Executar em modo desenvolvimento
npm run dev
```

### 3. Criar Branch
```bash
# Criar branch para sua feature/fix
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-fix
```

### 4. Fazer Mudanças
- Siga os padrões de código existentes
- Mantenha o design minimalista
- Teste suas mudanças
- Adicione comentários quando necessário

### 5. Commit e Push
```bash
# Adicionar arquivos
git add .

# Commit com mensagem descritiva
git commit -m "✨ feat: adiciona nova funcionalidade X"

# Push para seu fork
git push origin feature/nome-da-feature
```

### 6. Pull Request
- Abra um PR do seu fork para o repositório principal
- Descreva claramente as mudanças
- Inclua screenshots se aplicável
- Aguarde review

## 📝 Padrões de Código

### JavaScript/React
- Use ES6+ features
- Componentes funcionais com hooks
- Props destructuring
- Nomes descritivos para variáveis e funções

### CSS/Styling
- Use Material-UI theme system
- Mantenha design minimalista
- Cards transparentes com bordas
- Suporte a dark/light mode

### Commits
Use conventional commits:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação
- `refactor:` refatoração
- `test:` testes
- `chore:` tarefas de manutenção

## 🐛 Reportando Bugs

1. Verifique se o bug já foi reportado
2. Use o template de bug report
3. Inclua passos para reproduzir
4. Adicione screenshots se possível
5. Especifique ambiente (OS, browser, etc.)

## 💡 Sugerindo Features

1. Verifique se a feature já foi sugerida
2. Use o template de feature request
3. Explique o problema que resolve
4. Descreva a solução proposta
5. Considere alternativas

## 🎨 Design Guidelines

### Princípios
- **Minimalismo**: Interface limpa e focada
- **Consistência**: Padrões visuais uniformes
- **Acessibilidade**: WCAG AA compliant
- **Responsividade**: Funciona em todos os dispositivos

### Cores
- Light mode: Branco com cinzas sutis
- Dark mode: Preto puro (#0a0a0a) com cinzas
- Cards: Transparentes com bordas
- Sem gradientes ou sombras excessivas

### Tipografia
- Fonte: Inter
- Hierarquia clara (h1-h6)
- Line-height 1.6 para legibilidade
- Sem emojis na interface

## 🧪 Testes

### Frontend
```bash
cd packages/web
npm run lint
npm run build
```

### Backend
```bash
cd packages/api
npm run test
npm run build
```

### Integração
```bash
npm run test:api
```

## 📚 Estrutura do Projeto

```
divide-ai/
├── packages/
│   ├── api/          # Backend Node.js
│   └── web/          # Frontend React
├── .github/          # GitHub templates e workflows
├── docs/             # Documentação
└── scripts/          # Scripts de automação
```

## 🔍 Code Review

### O que verificamos:
- [ ] Funcionalidade funciona corretamente
- [ ] Código segue padrões estabelecidos
- [ ] Design mantém minimalismo
- [ ] Responsividade preservada
- [ ] Acessibilidade mantida
- [ ] Performance não impactada
- [ ] Documentação atualizada

### Processo:
1. Automated checks (CI/CD)
2. Manual review por maintainer
3. Feedback e ajustes se necessário
4. Merge após aprovação

## 🏷️ Versionamento

Seguimos [Semantic Versioning](https://semver.org/):
- `MAJOR`: Mudanças incompatíveis
- `MINOR`: Novas funcionalidades compatíveis
- `PATCH`: Correções de bugs

## 📞 Contato

- **Issues**: Para bugs e features
- **Discussions**: Para perguntas gerais
- **Email**: Para questões privadas

## 📄 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença MIT do projeto.

---

**Obrigado por contribuir para tornar o Divide.AI ainda melhor! 🎉**
