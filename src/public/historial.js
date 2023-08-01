window.onload = muestraDatos

async function muestraDatos() {
    const response = await fetch(`${window.location.origin}/historialData`)
    .then(response => response.json())
    .catch(error => {
        throw(error)
    })
    console.log(response)
    for (let i = response.length-1; i >= 0; --i) {
        const container = document.createElement("div")
        container.innerHTML = `Nombre: ${response[i].nombre}  Fecha: ${response[i].fecha}`
        container.classList.add("infodiv")
        document.getElementById("infocontainer").appendChild(container)
    }
}