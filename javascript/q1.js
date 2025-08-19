 let operacoes = {
  soma: (a, b) => a + b,
  subtracao: (a, b) => a - b,
  multiplicacao: (a, b) => a * b,
  divisao: (a, b) => {
};

let operacao = prompt("Digite a operação desejada (soma, subtracao, multiplicacao, divisao):").toLowerCase();
let valor1 = Number(prompt("Digite o primeiro valor:"));
let valor2 = Number(prompt("Digite o segundo valor:"));

if (isNaN(valor1) || isNaN(valor2)) {
  console.log("Erro: valores inválidos. Digite apenas números.");
} else if (!operacoes[operacao]) {
  console.log("Operação inválida. Tente novamente.");
} else {
  let resultado = operacoes[operacao](valor1, valor2);
  if (resultado !== null) {
    console.log(`Resultado da ${operacao}:`, resultado);
  }
}

