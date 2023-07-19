document.querySelector('button').addEventListener('click', actualizarNumero)
window.onload = mostrarNumero

var minutos = 0
var segundos = 0
var vecesClick = 0

function actualizarNumero() {

    if (vecesClick === 0 && minutos === 0 && segundos === 0) {
        actualiza()
        if (segundos === 0 && minutos === 0) {
            minutos = 5
            segundos = 1
            localStorage.setItem('horaActual', `${new Date().toLocaleTimeString()}`)
            iniciaContador()    

            let text = document.querySelector('input').value
            if (text === "") text = "Anónimo"
            console.log(text)
            localStorage.setItem("text", text)
        }
        
    }

    else {
        const errorBoton = document.getElementById("error-boton")
        if (errorBoton.classList.contains("animacionMoverse")) {
            errorBoton.classList.remove("animacionMoverse")
            setTimeout(() => {
                errorBoton.classList.add("animacionMoverse")
            }, 100)
        }
        else errorBoton.classList.add("animacionMoverse")
    }
    
    ++vecesClick 
}

function iniciaContador() {
    
    if (minutos === 0 && segundos === 0) {
        localStorage.setItem('segundos', `${segundos}`)
        localStorage.setItem('minutos', `${minutos}`)
        vecesClick = 0
        return
    }
    --segundos
    if (segundos < 0) {
        --minutos
        segundos = 59
    }
    if (vecesClick >= 1) document.getElementById("contador").innerHTML = `0${minutos}:${formatoSegundos(segundos)}`
    localStorage.setItem('segundos', `${segundos}`)
    localStorage.setItem('minutos', `${minutos}`)
    setTimeout(iniciaContador, 1000)
}

function formatoSegundos(numero) {
    if (numero >= 0 && numero < 10) return `0${numero}`
    return numero
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

    calculaTiempo()    
    ++vecesClick
    localStorage.setItem('horaActual', `${new Date().toLocaleTimeString()}`)
    iniciaContador()

    const response = await fetch('http://localhost:3000/data')
    .then(response => response.json())
    .catch(error => {
        throw(error);
    })

    document.getElementById('numero').innerHTML = response.number
}

function calculaTiempo() {
    if (localStorage.getItem('segundos') !== null && localStorage.getItem('minutos') !== null) {
        let segundosContador = localStorage.getItem('segundos')
        let minutosContador = localStorage.getItem('minutos')

        if (localStorage.getItem('horaActual') !== null) {
            const horaGuardada = localStorage.getItem('horaActual').split(':')
            const horaActual = new Date().toLocaleTimeString().split(':')
            console.log(`horaGuardada: ${horaGuardada} horaActual: ${horaActual}`)

            if (parseInt(horaActual[1]) < parseInt(horaGuardada[1])) segundos = minutos = 0
            else {
                let minutosPasados = parseInt(horaActual[1]) - parseInt(horaGuardada[1])
                let segundosPasados = parseInt(horaActual[2]) - parseInt(horaGuardada[2])

                if (segundosPasados < 0) {
                    segundosPasados += 60
                    --minutosPasados
                }

                if ((minutosPasados >= minutosContador) || (minutosPasados === minutosContador && segundosPasados >= segundosContador)) segundos = minutos = 0
                else {
                    minutos = minutosContador - minutosPasados
                    segundos = segundosContador - segundosPasados
                    if (segundos < 0) {
                        segundos += 60
                        --minutos
                    }
                }
            }

            
        }
        else {
            localStorage.setItem('horaActual', `${new Date().toLocaleTimeString()}`)
            location.reload()
        }
    }
}