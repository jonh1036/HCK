const pilotos = ['Vettel', 'Alonso', 'Raikkonen', 'Massa']
pilotos.pop() //Remove o último
console.log(pilotos)

pilotos.push('Verstappen')
console.log(pilotos)

pilotos.shift() //Remove o primeiro
console.log(pilotos)

pilotos.unshift('Hamilton')
console.log(pilotos)

//splice pode adicionar e remover elementos

//adicionando
pilotos.splice(2, 0, 'Bottas', 'Massa')
console.log(pilotos)

//removendo
pilotos.splice(3, 1)
console.log(pilotos)

const algunsPilotos1 = pilotos.slice(2) //Novo array
console.log(algunsPilotos1)

const algunsPilotos2 = pilotos.slice(1, 4) //O último elemento não entra!
console.log(algunsPilotos2)