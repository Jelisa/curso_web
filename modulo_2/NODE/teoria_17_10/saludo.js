function saludar (nombre){
    return "hola " + nombre;
}

function buenasTardes(){
    return "Buenas Tardes!";
}
/* // Primera version de exportar
console.log(module.exports);

module.exports.misaludo = saludar;
module.exports.saludoTardes = buenasTardes;

console.log(module.exports);
 */

module.exports = {
    saludoNombre : saludar,
    saludoTardes : buenasTardes
}