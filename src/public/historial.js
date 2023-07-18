window.onload = recogeDatos

function recogeDatos() {
    let text = localStorage.getItem("text")
    if (text !== null) {
        document.getElementById("infotexto").innerHTML = `${text}`
    }
}