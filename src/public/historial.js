window.onload = muestraDatos

async function muestraDatos() {
    const response = await fetch('http://localhost:3000/historialData')
    .then(response => response.json())
    .catch(error => {
        throw(error)
    })
    console.log(response)
    for (let i = 0; i < response.length; ++i) {
        const container = document.createElement("div")
        container.innerHTML = `Nombre: ${response[i].nombre} Fecha: ${response[i].fecha}`
        document.getElementById("infocontainer").appendChild(container)
    }
}