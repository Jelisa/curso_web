const frutas = document.querySelectorAll(".frutas");
console.log(frutas[0].getAttribute("contenido"));

frutas.forEach(obtenerDatos);

function obtenerDatos(item){
    item.addEventListener("click", function (){
        let valor = item.getAttribute("contenido");
        alert("Has pedido " + valor);
    })
}

function enviarDatos(){
    let nombre = document.getElementById("nom").value;
    alert("has escrito " + nombre);
}