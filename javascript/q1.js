const operacoes = {
  soma: (a, b) => a + b,
  subtracao: (a, b) => a - b,
  multiplicacao: (a, b) => a * b,
  divisao: (a, b) => {
    if (b === 0) {
      console.log("Erro: não é possível dividir por zero.");
      return null;
    }
    return a / b;
  }
};

const operacao = prompt("Digite a operação desejada (soma, subtracao, multiplicacao, divisao):").toLowerCase();
const valor1 = Number(prompt("Digite o primeiro valor:"));
const valor2 = Number(prompt("Digite o segundo valor:"));

if (isNaN(valor1) || isNaN(valor2)) {
  console.log("Erro: valores inválidos. Digite apenas números.");
} else if (!operacoes[operacao]) {
  console.log("Operação inválida. Tente novamente.");
} else {
  const resultado = operacoes[operacao](valor1, valor2);
  if (resultado !== null) {
    console.log(`Resultado da ${operacao}:`, resultado);
  }
}
