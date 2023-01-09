const parOuImpar = process.argv[2]
const num = process.argv[3]

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
console.log(numeroAleatorioEntreZeroeDez)

const soma = Number(num) + Number(numeroAleatorioEntreZeroeDez)
console.log(soma)

if(!parOuImpar && !num){
    console.log("Digite par ou impar e um número")
} else {
    if(parOuImpar === "par" && soma % 2 === 0){
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você ganhou!`)
    } else if (parOuImpar === "par" && soma % 2 === 1){
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${soma}. Você perdeu!`)
    } else if (parOuImpar === "impar" && soma % 2 === 1){
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você ganhou!`)
    } else if (parOuImpar === "impar" && soma % 2 === 0){
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${soma}. Você perdeu!`)
    } else {
        console.log("Algo deu errado")
    }
}