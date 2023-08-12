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
        container.classList.add("infodiv")
        document.getElementById("infocontainer").appendChild(container)

        const div = document.createElement("div")
        div.classList.add("h3leftcontainer")
        container.appendChild(div)
        const h3 = document.createElement("h3")
        h3.innerHTML = `${response[i].nombre}`  
        div.appendChild(h3)

        const div3 = document.createElement("div")
        div3.classList.add("lineadiv")
        container.appendChild(div3)

        const div2 = document.createElement("div")
        div2.classList.add("h3rightcontainer")
        container.appendChild(div2)
        const h32 = document.createElement("h3")
        h32.innerHTML = `${response[i].fecha}`
        div2.appendChild(h32)
        
    }
}