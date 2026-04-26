#!/usr/bin/env node

import QRCodeController from './controllers/qrCodeController.js';
import chalk from 'chalk';

/**
 * Ponto de entrada principal da aplicação
 */
async function main() {
  try {
    const controller = new QRCodeController();
    await controller.start();
  } catch (error) {
    console.error(chalk.red.bold('❌ Erro fatal:'), error.message);
    process.exit(1);
  }
}

// Tratamento de sinais de interrupção
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n⚠️ Programa interrompido pelo usuário.'));
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error(chalk.red.bold('❌ Erro não tratado:'), error.message);
  process.exit(1);
});

// Inicia a aplicação
main();