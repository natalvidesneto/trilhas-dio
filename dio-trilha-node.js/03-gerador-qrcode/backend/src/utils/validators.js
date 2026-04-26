/**
 * Valida e processa URLs de produtos para e-commerce
 */

export const validators = {
  /**
   * Valida se a URL tem formato correto
   * @param {string} url - URL a ser validada
   * @returns {boolean} - true se válida
   */
  isValidUrl: (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  },

  /**
   * Garante que a URL tenha protocolo
   * @param {string} url - URL original
   * @returns {string} - URL com protocolo
   */
  ensureProtocol: (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  },

  /**
   * Valida nome do produto
   * @param {string} name - Nome do produto
   * @returns {boolean} - true se válido
   */
  isValidProductName: (name) => {
    return name && name.trim().length > 0 && name.length <= 100;
  }
};