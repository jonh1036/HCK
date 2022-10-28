Array.prototype.reduce2 = function(callback){
    let acumulador = this[0]
    for (let i = 1; i < this.length; i++) {
        acumulador = callback(acumulador,this[i], i, this)
    }
    return acumulador
}

const alunos = [
    { nome: 'João', nota: 7.3, bolsista: false},
    { nome: 'Maria', nota: 9.2, bolsista: true},
    { nome: 'Pedro', nota: 9.8, bolsista: false},
    { nome: 'Ana', nota: 8.7, bolsista: true}
]

//Desafio 1: Todos os alunos são bolsistas?

const todosBolsistas = (resultado, bolsista) => resultado && bolsista
console.log(alunos.map(a => a.bolsista).reduce2(todosBolsistas))

//Desafio 2: Algum aluno é bolsista?

const algumBolsista = (resultado, bolsista) => resultado || bolsista
console.log(alunos.map(a => a.bolsista).reduce2(algumBolsista))

const soma = (total, atual) => total + atual
const nums = [1, 2, 3, 4, 5, 6]
console.log(nums.reduce2(soma))