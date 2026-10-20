import { useState, useEffect } from 'react';
import './App.css';

// Parser simples para expressões com +, -, *, /, %
function evaluateExpression(expr) {
  // Remove espaços e normaliza
  const tokens = expr.replace(/\s+/g, '').match(/(\d+\.?\d*|[+\-*/%])/g);
  if (!tokens) throw new Error('Expressão inválida');

  // Primeira passada: resolve * / % (maior precedência)
  const stack = [parseFloat(tokens[0])];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const num = parseFloat(tokens[i + 1]);
    if (isNaN(num)) throw new Error('Número inválido');

    if (op === '*' || op === '/' || op === '%') {
      const prev = stack.pop();
      if (op === '*') stack.push(prev * num);
      else if (op === '/') {
        if (num === 0) throw new Error('Divisão por zero');
        stack.push(prev / num);
      } else stack.push(prev % num);
    } else {
      stack.push(op, num);
    }
  }

  // Segunda passada: resolve + e -
  let result = stack[0];
  for (let i = 1; i < stack.length; i += 2) {
    const op = stack[i];
    const num = stack[i + 1];
    result = op === '+' ? result + num : result - num;
  }

  return result;
}

function App() {
  // Estado para o tema (inicia verificando a preferência do sistema)
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  // Estados da Calculadora
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState(''); // Histórico/Expressão
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Efeito para ouvir mudanças no tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Funções de Lógica
  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperator = (op) => {
    setWaitingForOperand(true);
    // Se já houver uma expressão pendente, calcula o valor parcial
    if (expression && !waitingForOperand) {
      calculate();
    } else {
      setExpression(display + ' ' + op);
    }
  };

  const calculate = () => {
    if (!expression) return;

    // Substitui símbolos visuais por operadores JS
    const fullExpression = expression + ' ' + display;
    const sanitizedExpression = fullExpression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    try {
      const result = evaluateExpression(sanitizedExpression);

      // Formata o resultado (remove decimais desnecessários)
      const formattedResult = parseFloat(result.toFixed(10)).toString();

      setDisplay(formattedResult);
      setExpression(''); // Limpa a expressão após o resultado
      setWaitingForOperand(true);
    } catch {
      setDisplay('Erro');
      setExpression('');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setExpression('');
    setWaitingForOperand(false);
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    setDisplay(prev => (parseFloat(prev) * -1).toString());
  };

  return (
    <div className={`container ${isDark ? 'dark' : 'light'}`}>
      <div className="calculator">
        {/* Tela */}
        <div className="display-container">
          <div className="expression">{expression}</div>
          <div className="display">{display}</div>
        </div>

        {/* Teclado */}
        <div className="keypad">
          {/* Linha 1 - Funções */}
          <button className="btn-function" onClick={clearAll}>Ac</button>
          <button className="btn-function" onClick={toggleSign}>±</button>
          <button className="btn-function" onClick={() => handleOperator('%')}>%</button>
          <button className="btn-operator" onClick={() => handleOperator('÷')}>÷</button>

          {/* Linha 2 */}
          <button className="btn-number" onClick={() => handleNumber(7)}>7</button>
          <button className="btn-number" onClick={() => handleNumber(8)}>8</button>
          <button className="btn-number" onClick={() => handleNumber(9)}>9</button>
          <button className="btn-operator" onClick={() => handleOperator('×')}>×</button>

          {/* Linha 3 */}
          <button className="btn-number" onClick={() => handleNumber(4)}>4</button>
          <button className="btn-number" onClick={() => handleNumber(5)}>5</button>
          <button className="btn-number" onClick={() => handleNumber(6)}>6</button>
          <button className="btn-operator" onClick={() => handleOperator('−')}>−</button>

          {/* Linha 4 */}
          <button className="btn-number" onClick={() => handleNumber(1)}>1</button>
          <button className="btn-number" onClick={() => handleNumber(2)}>2</button>
          <button className="btn-number" onClick={() => handleNumber(3)}>3</button>
          <button className="btn-operator" onClick={() => handleOperator('+')}>+</button>

          {/* Linha 5 */}
          <button className="btn-number btn-zero" onClick={() => handleNumber(0)}>0</button>
          <button className="btn-number" onClick={handleDecimal}>.</button>
          <button className="btn-equals" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;