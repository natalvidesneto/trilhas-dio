import qrcode from 'qrcode-terminal';
import chalk from 'chalk';
import fs from 'fs'; // ← Importação correta para ESModules
import path from 'path'; // ← Para manipular caminhos de arquivo
import { fileURLToPath } from 'url'; // ← Para obter o diretório atual

// Obtém o diretório atual em ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Serviço de geração de QR Codes
 */
class QRCodeService {
  constructor() {
    this.history = [];
    this.historyFile = path.join(__dirname, '../../qr-history.json');
    this.loadHistoryFromFile(); // Carrega histórico salvo ao iniciar
  }

  /**
   * Carrega histórico do arquivo JSON
   */
  loadHistoryFromFile() {
    try {
      if (fs.existsSync(this.historyFile)) {
        const data = fs.readFileSync(this.historyFile, 'utf8');
        this.history = JSON.parse(data);
        console.log(chalk.gray(`📂 Histórico carregado: ${this.history.length} QR Codes`));
      }
    } catch (error) {
      console.log(chalk.gray('📂 Nenhum histórico anterior encontrado'));
    }
  }

  /**
   * Gera QR Code para um produto
   * @param {string} url - URL do produto
   * @param {string} productName - Nome do produto
   */
  generateQRCode(url, productName) {
    return new Promise((resolve, reject) => {
      try {
        console.log(chalk.cyan('\n═══════════════════════════════════════'));
        console.log(chalk.green.bold(`📦 Produto: ${productName}`));
        console.log(chalk.white(`🔗 Link: ${url}`));
        console.log(chalk.cyan('═══════════════════════════════════════\n'));

        // Gera QR Code no terminal
        qrcode.generate(url, { small: true }, (qrCode) => {
          console.log(chalk.yellow.bold('📱 QR Code gerado com sucesso!\n'));
          console.log(qrCode);
          
          // Salva no histórico
          this.saveToHistory({
            product: productName,
            url: url,
            timestamp: new Date().toISOString(),
            qrGenerated: true
          });
          
          console.log(chalk.green.bold('\n✅ QR Code pronto para uso!'));
          console.log(chalk.gray('💡 Dica: Use o QR Code em embalagens, etiquetas ou materiais promocionais.\n'));
          resolve(true);
        });
      } catch (error) {
        console.error(chalk.red.bold('❌ Erro ao gerar QR Code:'), error.message);
        reject(error);
      }
    });
  }

  /**
   * Gera múltiplos QR Codes para vários produtos
   * @param {Array} products - Lista de produtos
   */
  async generateMultipleQRCodes(products) {
    console.log(chalk.blue.bold(`\n🔄 Gerando ${products.length} QR Codes...\n`));
    
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(chalk.yellow(`[${i + 1}/${products.length}] Processando...`));
      await this.generateQRCode(product.url, product.name);
      
      if (i < products.length - 1) {
        console.log(chalk.gray('⏳ Aguarde 1 segundo...\n'));
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(chalk.green.bold(`\n🎉 Todos os ${products.length} QR Codes foram gerados!\n`));
  }

  /**
   * Salva QR Code no histórico
   * @param {Object} qrData - Dados do QR Code gerado
   */
  saveToHistory(qrData) {
    this.history.push(qrData);
    this.saveHistoryToFile(); // Auto-save ao adicionar novo item
  }

  /**
   * Salva histórico no arquivo JSON
   */
  saveHistoryToFile() {
    try {
      const data = JSON.stringify(this.history, null, 2);
      fs.writeFileSync(this.historyFile, data, 'utf8');
    } catch (error) {
      console.error(chalk.red('❌ Erro ao salvar histórico:'), error.message);
    }
  }

  /**
   * Exibe histórico de QR Codes gerados
   */
  showHistory() {
    if (this.history.length === 0) {
      console.log(chalk.yellow('\n📭 Nenhum QR Code gerado ainda.\n'));
      return;
    }

    console.log(chalk.cyan.bold('\n📜 HISTÓRICO DE QR CODES\n'));
    this.history.forEach((item, index) => {
      console.log(chalk.white(`${index + 1}. 📦 ${item.product}`));
      console.log(chalk.gray(`   🔗 ${item.url}`));
      console.log(chalk.gray(`   🕐 ${new Date(item.timestamp).toLocaleString('pt-BR')}\n`));
    });
    
    console.log(chalk.cyan(`📊 Total: ${this.history.length} QR Code(s) gerado(s)\n`));
  }

  /**
   * Exporta histórico como JSON (já está salvo automaticamente)
   */
  exportHistory() {
    try {
      const filePath = this.historyFile;
      const stats = fs.statSync(filePath);
      const fileSize = (stats.size / 1024).toFixed(2);
      
      console.log(chalk.green.bold('\n✅ Histórico exportado com sucesso!'));
      console.log(chalk.white(`📁 Arquivo: ${filePath}`));
      console.log(chalk.white(`📊 Tamanho: ${fileSize} KB`));
      console.log(chalk.white(`📝 Registros: ${this.history.length}`));
      
      if (this.history.length > 0) {
        console.log(chalk.cyan('\n📋 Últimos registros:'));
        const lastThree = this.history.slice(-3);
        lastThree.forEach(item => {
          console.log(chalk.gray(`   • ${item.product} - ${new Date(item.timestamp).toLocaleDateString('pt-BR')}`));
        });
      }
      
      console.log(chalk.gray('\n💡 Dica: Use "npm start" e escolha opção 3 para visualizar o histórico completo.\n'));
    } catch (error) {
      console.error(chalk.red.bold('❌ Erro ao exportar histórico:'), error.message);
    }
  }

  /**
   * Limpa todo o histórico
   */
  clearHistory() {
    this.history = [];
    this.saveHistoryToFile();
    console.log(chalk.yellow('🗑️ Histórico limpo com sucesso!'));
  }
}

export default QRCodeService;