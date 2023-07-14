document.querySelector('button').addEventListener('click', actualizarNumero)
window.onload = mostrarNumero


async function actualizarNumero() {
    console.log('click')
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