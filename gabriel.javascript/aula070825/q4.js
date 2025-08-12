let n1 = prompt("Qual sua primeira nota?")
let p1 = prompt("Qual o peso dessa nota? ")

let n2 = prompt("Qual sua segunda nota? ")
let p2 = prompt("Qual o peso dessa nota? ")

let n3 = prompt("Qual sua terceira nota? ")
let p3 = prompt("Qual o peso dessa nota? ")

n1 = Number(n1)
n2 = Number(n2)
n3 = Number(n3)

p1 = Number(p1)
p2 = Number(p2)
p3 = Number(p3)

console.log("A média ponderada é" + (((n1 * p1) + (n2 * p2) + (n3 * p3)) / (p1 + p2 + p3)))