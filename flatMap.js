const escola = [{
    nome: 'Turma 1',
    alunos: [{
        nome: 'Gustavo',
        nota: 6.8
    }, {
        nome: 'Rebeca',
        nota: 7.8
    }]
},{
    nome: 'Turma 2',
    alunos: [{
        nome: 'João',
        nota: 9.8
    },{
        nome: 'Maria',
        nota: 10
    }]
}]

const getNotasAlunos = aluno => aluno.nota
const getNotasTurma = turma => turma.alunos.map(getNotasAlunos)

const notas1 = escola.map(getNotasTurma)
console.log(notas1)

Array.prototype.flatMap = function(callback){
    return Array.prototype.concat.apply([], this.map(callback))
}

const notas2 = escola.flatMap(getNotasTurma)
console.log(notas2)