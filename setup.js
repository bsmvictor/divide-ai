#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando o projeto Divide.AI...\n');

function runCommand(command, description) {
  console.log(`📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} concluído!\n`);
  } catch (error) {
    console.error(`❌ Erro ao executar: ${description}`);
    console.error(error.message);
    process.exit(1);
  }
}

function createEnvFile() {
  const envPath = path.join(__dirname, 'packages', 'api', '.env');
  if (!fs.existsSync(envPath)) {
    console.log('📝 Criando arquivo .env para a API...');
    fs.writeFileSync(envPath, `PORT=3001\nNODE_ENV=development\n`);
    console.log('✅ Arquivo .env criado!\n');
  } else {
    console.log('✅ Arquivo .env já existe!\n');
  }
}

async function main() {
  try {
    // Instalar dependências
    runCommand('npm install', 'Instalando dependências do monorepo');
    runCommand('npm install --workspace=@divide-ai/api', 'Instalando dependências da API');
    runCommand('npm install --workspace=@divide-ai/mobile', 'Instalando dependências do Mobile');

    // Criar arquivo .env
    createEnvFile();

    console.log('🎉 Setup concluído com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Execute "npm run dev" para iniciar API e Mobile juntos');
    console.log('2. Ou execute "npm run dev:api" e "npm run dev:mobile" em terminais separados');
    console.log('3. Escaneie o QR code no terminal para abrir o app no seu celular');
    console.log('\n📚 Documentação da API: packages/api/API_DOCUMENTATION.md');
    console.log('🌐 Health Check: http://localhost:3001/health');

  } catch (error) {
    console.error('❌ Erro durante o setup:', error.message);
    process.exit(1);
  }
}

main();
