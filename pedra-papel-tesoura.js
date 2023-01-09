const valor = process.argv[2]
const escolhaUsuario = valor.toLowerCase()

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroAleatorioEntreUmETres = getRndInteger(1, 3)
console.log(numeroAleatorioEntreUmETres)

const escolhaComputador = () => {
    switch (numeroAleatorioEntreUmETres) {
        case 1:
            return "pedra"
            break
        case 2:
            return "papel"
            break
        case 3:
            return "tesoura"
            break
        default:
            console.log("Escolha não encontrada")
    }
}

if (!escolhaUsuario) {
    console.log("Digite papel, pedra ou tesoura")
} else {
    if (escolhaUsuario === "pedra" && escolhaComputador() === "papel"){
        console.log("Você escolheu pedra e o computador escolheu papel. Você perdeu!")
    } else if (escolhaUsuario === "papel" && escolhaComputador() === "tesoura"){
        console.log("Você escolheu papel e o computador escolheu tesoura. Você perdeu!")
    } else if (escolhaUsuario === "tesoura" && escolhaComputador() === "papel"){
        console.log("Você escolheu tesoura e o computador escolheu papel. Você ganhou!")
    } else if (escolhaUsuario === "papel" && escolhaComputador() === "pedra"){
        console.log("Você escolheu papel e o computador escolheu pedra. Você ganhou!")
    } else if (escolhaUsuario === "pedra" && escolhaComputador() === "tesoura"){
        console.log("Você escolheu pedra e o computador escolheu tesoura. Você ganhou!")
    } else {
        console.log(`Você escolheu ${escolhaUsuario} e o computador escolheu ${escolhaComputador()}. Empate!`)
    }
}