import readline from 'readline';
import chalk from 'chalk';
import QRCodeService from '../services/qrCodeService.js';
import { validators } from '../utils/validators.js';

/**
 * Controlador de QR Codes
 */
class QRCodeController {
  constructor() {
    this.qrService = new QRCodeService();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  /**
   * Inicia o menu principal
   */
  async start() {
    this.showBanner();
    await this.mainMenu();
  }

  /**
   * Exibe banner do sistema
   */
  showBanner() {
    console.clear();
    console.log(chalk.magenta.bold(`
╔══════════════════════════════════════════════╗
║     🛍️  QR CODE GENERATOR FOR E-COMMERCE    ║
║     Gere QR Codes para produtos rapidamente  ║
╚══════════════════════════════════════════════╝
    `));
  }

  /**
   * Menu principal
   */
  async mainMenu() {
    console.log(chalk.cyan('\n📋 MENU PRINCIPAL'));
    console.log(chalk.white('1. 🔗 Gerar QR Code para um produto'));
    console.log(chalk.white('2. 📦 Gerar QR Codes em lote'));
    console.log(chalk.white('3. 📜 Ver histórico de QR Codes'));
    console.log(chalk.white('4. 💾 Exportar histórico (JSON)'));
    console.log(chalk.white('0. 🚪 Sair\n'));

    const answer = await this.question(chalk.yellow('👉 Escolha uma opção: '));

    switch(answer) {
      case '1':
        await this.generateSingleQRCode();
        break;
      case '2':
        await this.generateBatchQRCodes();
        break;
      case '3':
        this.qrService.showHistory();
        await this.waitForEnter();
        await this.mainMenu();
        break;
      case '4':
        this.qrService.exportHistory();
        await this.waitForEnter();
        await this.mainMenu();
        break;
      case '0':
        this.exit();
        break;
      default:
        console.log(chalk.red('❌ Opção inválida!'));
        await this.waitForEnter();
        await this.mainMenu();
    }
  }

  /**
   * Gera QR Code para um único produto
   */
  async generateSingleQRCode() {
    console.log(chalk.cyan('\n🎯 GERAR QR CODE - PRODUTO ÚNICO\n'));
    
    const productName = await this.question(chalk.white('📦 Nome do produto: '));
    
    if (!validators.isValidProductName(productName)) {
      console.log(chalk.red('❌ Nome inválido! Use 1-100 caracteres.'));
      await this.waitForEnter();
      await this.mainMenu();
      return;
    }
    
    let url = await this.question(chalk.white('🔗 URL do produto (ex: loja.com/produto): '));
    url = validators.ensureProtocol(url);
    
    if (!validators.isValidUrl(url)) {
      console.log(chalk.red('❌ URL inválida! Verifique o formato.'));
      await this.waitForEnter();
      await this.mainMenu();
      return;
    }
    
    await this.qrService.generateQRCode(url, productName);
    await this.waitForEnter();
    await this.mainMenu();
  }

  /**
   * Gera QR Codes em lote
   */
  async generateBatchQRCodes() {
    console.log(chalk.cyan('\n📦 GERAR QR CODES - LOTE DE PRODUTOS\n'));
    
    const quantity = await this.question(chalk.white('🔢 Quantos produtos deseja cadastrar? '));
    const numProducts = parseInt(quantity);
    
    if (isNaN(numProducts) || numProducts <= 0 || numProducts > 50) {
      console.log(chalk.red('❌ Quantidade inválida! Máximo 50 produtos por lote.'));
      await this.waitForEnter();
      await this.mainMenu();
      return;
    }
    
    const products = [];
    
    for (let i = 0; i < numProducts; i++) {
      console.log(chalk.yellow(`\n📝 Produto ${i + 1} de ${numProducts}:`));
      
      const name = await this.question(chalk.white('   Nome: '));
      let url = await this.question(chalk.white('   URL: '));
      url = validators.ensureProtocol(url);
      
      if (validators.isValidProductName(name) && validators.isValidUrl(url)) {
        products.push({ name, url });
      } else {
        console.log(chalk.red('   ⚠️ Dados inválidos, produto ignorado!'));
      }
    }
    
    if (products.length === 0) {
      console.log(chalk.red('❌ Nenhum produto válido cadastrado!'));
    } else {
      await this.qrService.generateMultipleQRCodes(products);
    }
    
    await this.waitForEnter();
    await this.mainMenu();
  }

  /**
   * Aguarda o usuário pressionar Enter
   */
  async waitForEnter() {
    await this.question(chalk.gray('\n⏎ Pressione Enter para continuar...'));
  }

  /**
   * Faz uma pergunta ao usuário
   * @param {string} question - Pergunta a ser feita
   * @returns {Promise<string>} - Resposta do usuário
   */
  question(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  /**
   * Encerra o programa
   */
  exit() {
    console.log(chalk.magenta.bold('\n👋 Obrigado por usar o QR Code Generator!\n'));
    this.rl.close();
    process.exit(0);
  }
}

export default QRCodeController;