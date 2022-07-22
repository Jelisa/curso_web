let hora = parseInt(prompt("Qué hora es?"));

let output = "No valid input";

if (isNaN(hora)) alert("Not a valid input");
else if (hora < 0 || hora > 24) alert("Not a valid input");
else if (hora >= 6 && hora <= 14) output = "Buenos días";
else if (hora > 14 && hora <= 21) output = "Buenas tardes";
else output = "Buenas noches";

console.log(output)

document.getElementById("respuesta").innerHTML = output