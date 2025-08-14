let km= prompt("Distância em km: ")
let kmh = prompt("Velocidade Média; ")
let prc = prompt("Preço do Combustivel: ")
let con = prompt("Consumo do carro em km/l:")

km = Number(km)
kmh =  Number(kmh)
prc =  Number(prc)
con =  Number(con)

console.log("O tempo em horas foi:" + (km*kmh))
console.log("O quantidade de litos gastos foi:" + (prc*km))
console.log("O tempo em  foi:" + (prc*con))