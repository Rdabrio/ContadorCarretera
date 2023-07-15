document.querySelector('button').addEventListener('click', actualizarNumero)
window.onload = mostrarNumero

var minutos = 0
var segundos = 0
var vecesClick = 0
var mostrarDiv = false

function actualizarNumero() {

    if (vecesClick === 0) {
        actualiza()
        minutos = 5
        segundos = 1
        iniciaContador()
    }
    else if (vecesClick === 1) {
        mostrarDiv = true
    }

    if (mostrarDiv) {
        document.getElementById("contador").innerHTML = `0${minutos}:${segundos}`
        document.getElementById("error-boton").style.opacity = 1;
        document.getElementById("error-boton").classList.add("animacionMoverse")
        mostrarDiv = false
    }
    ++vecesClick 

    //de momento funciona con dos clicks seguidos, toca perfeccionarlo y hacerlo funcional
}

function iniciaContador() {
    if (minutos === 0 && segundos === 0) return
    --segundos
    if (segundos < 0) {
        --minutos
        segundos = 59
    }
    console.log(`0${minutos}:${segundos}`)
    setTimeout(iniciaContador, 1000)
}

async function actualiza() {
    let numero = parseInt(document.getElementById('numero').innerHTML)
    numero += 1

    let data = {
        "number":numero
    }

    const response = await fetch('http://localhost:3000/data', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        throw(error);
    })
    document.getElementById('numero').innerHTML = response.number
}

async function mostrarNumero() {
    const response = await fetch('http://localhost:3000/data')
    .then(response => response.json())
    .catch(error => {
        throw(error);
    })

    document.getElementById('numero').innerHTML = response.number
}