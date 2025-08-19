let filme= {
   titulo = prompt(`Digite o título do filme ${numero}:`);
   diretor = prompt(`Digite o nome do diretor do filme ${numero}:`);
   ano = prompt(`Digite o ano de lançamento do filme ${numero}:`);
   nota = Number(prompt(`Digite a nota do filme ${numero} (0 a 10):`));
  
}

let filme1 = criarFilme(1);
let filme2 = criarFilme(2);

console.log("Filme 1:", filme1);
console.log("Filme 2:", filme2);

if (filme1.nota > filme2.nota) {
  console.log(`O filme com a melhor nota é: ${filme1.titulo}`);
} else if (filme2.nota > filme1.nota) {
  console.log(`O filme com a melhor nota é: ${filme2.titulo}`);
} else {
  console.log("Os dois filmes têm a mesma nota.");

}
