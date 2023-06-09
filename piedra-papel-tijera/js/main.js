let puntosUsuario = 0
let puntosPc = 0
 
let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario")
let contenedorPuntosPc = document.querySelector("#puntos-computadora")
let mensajePuntosPc = document.querySelector("#mensaje");
let contenedorGanaPunto = document.querySelector("#gana-punto");
let elegiTuArma = document.querySelector("#elegi-tu-arma")

let contenedorEleccionUsuario = document.querySelector("#eleccion-usuario")
let contenedorEleccionPc = document.querySelector("#eleccion-computadora")


let botonesArmas = document.querySelectorAll(".arma")
botonesArmas.forEach(boton => {
    boton.addEventListener("click", iniciarTurno)
});

function iniciarTurno(e) {

    let eleccionPc = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id
  
    if (eleccionPc == 0) {
        eleccionPc = "piedra✊🏻"
    } else if (eleccionPc == 1) {
        eleccionPc = "papel📋"
    } else {
        eleccionPc = "tijera✂"
    }

    if (
        (eleccionUsuario == "piedra✊🏻" && eleccionPc == "tijera✂") ||
        (eleccionUsuario == "papel📋" && eleccionPc == "piedra✊🏻") ||
        (eleccionUsuario == "tijera✂" && eleccionPc == "papel📋")
    ) {
        ganaUsuario()
    } else if (
        (eleccionPc == "piedra✊🏻" && eleccionUsuario == "tijera✂") ||
        (eleccionPc == "papel📋" && eleccionUsuario== "piedra✊🏻") ||
        (eleccionPc == "tijera✂" && eleccionUsuario == "papel📋")
    ) {
        ganaPc()
    } else {
        empate()
    }

}


function ganaUsuario() {
    puntosUsuario++
    contenedorPuntosUsuario.innerText = puntosUsuario
    contenedorGanaPunto.innerText = "¡Ganaste 1 punto!🏆"
}

function ganaPc() {
    puntosPc++
    contenedorPuntosPc.innerText = puntosPc
    contenedorGanaPunto.innerText = "¡La computadora gano 1 punto!😥"
}

function empate() {
    contenedorGanaPunto.innerText = "¡Empate!🙅🏻‍♂️"
}