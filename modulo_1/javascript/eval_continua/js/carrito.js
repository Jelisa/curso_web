/*
Hay que programar un carrito de compra de fruta.

El cliente eligirá que fruta quiere haciendo click sobre la imagen.
Un mensaje emergente le preguntará qué cantidad quiere.

Esta información se mostrará debajo de "Total carrito", 
en <p id="carrito"></p>, de esta forma:
 Kiwi 2 kg x 4,20€/kg = 8,40 €
 Total Compra: 8,40€
 
Se dará la opción de añadir o no más productos que se mostrarán
a continuación de los anteriores, y se sumará todo en el total. 
Por ejemplo:  
 Kiwi 2 kg x 4,20€/kg = 8,40€
 Pomelo 1 kg x 2,50€/kg = 2,50€
 Total Compra: 10,90€


 Lo importante es el cálculo, no los estilos css
 */

// Variable que contiene aquellos productos que van por unidades en lugar de por Kg.
var unitaryProducts = ["pinya", "piña"];
// Variable que contiene el total de la compra.
var total = 0.0;

function addProduct(productName) {
    /*Esta función añade un producto al carro de la compra.
    Recibe: el nombre de un producto.
    No devuelve nada.*/
    // Se le pide al usuario que introduzca una cantidad del producto seleccionado.
    let quantity = parseFloat(prompt("Qué cantidad desea comprar?"));
    if (quantity <= 0.0 || isNaN(quantity)) {
        alert("El producto seleccionado no se añadirá al carro de la compra porque ha introducido un 0 o un valor no válido como cantidad.")}
    //Si la cantidad es correcta.
    else {
        // Se genera un objeto de la clase producto con los datos del HTML y se actualiza el carrito de la compra.
        updateShoppingCart(new Product(productName, quantity, getProductPrice(document.getElementById(productName).innerHTML)));}
    // Se pregunta si se quiere seguir comprando.
    continueShopping();
}

function getProductPrice(string) {
    /*Una función para extraer el precio del cuerpo del documento HTML aprovechando el patrón del precio que da una alerta si este proceso no funciona
    Recibe: una string con la descripción del precio en el siguiente formato: 'Nombre : precio€/unidad'
    Devuelve: Un float con el precio.     
    */
    // Para extraer el precio del podemos encadenar splits para obtener un string con el precio.
    let price = parseFloat(string.split(":")[1].split('€')[0].replaceAll(",", "."));
    // Si el precio no ha sido extraido correctamente salta una alarma y 
    // devuelve un 0 para evitar el colapso de la aplicación.
    if (isNaN(price)) {
        alert("Update the function to get the Price from the HTML, it isn't working properly");
        return 0.0;}
    // En caso contrario devuelve el precio en formato float.
    else return price;
}

function continueShopping() {
    //Esta función pregunta al usuario si quiere finalizar la compra o no y desactiva la aplicación.
    if (confirm("¿Quiere finalizar su compra?")) {
        alert("Compra Finalizada");
        deactivateImages();}
}

function deactivateImages() {
    /* Esta función elimina la funcionalidad de las imagenes de añadir elementos al carrito de la compra */
    for (x of document.getElementsByClassName("imatges")) {
        x.onclick = function () { };}
}

function updateShoppingCart(productToUpdate) {
    //Función que actualiza el carrito de la compra.
    document.getElementById("carrito").innerHTML += `<p class="shopping_list_element">${generateShoppingCartString(productToUpdate)}</p>`;
    total += productToUpdate.subtotal;
    document.getElementById("total").innerHTML = `<h2>Total Compra: ${total.toFixed(2).replaceAll(".", ",")}</h2>`;
}

function generateShoppingCartString(product) {
    // función que convierte el objeto en una string con el formato necesario para el carrito de la compra
    return `${product.name}  ${product.amount} ${product.units} x ${product.floatToStringWithComa(product.unitPrice)}€/${product.units} = ${product.floatToStringWithComa(product.subtotal)}€`; // usamos la longitud de la array de elementos comprados -1 como indice para eliminar el producto.
}

class Product {
    /*Una clase para modelar los diferentes productos*/
    constructor(name, amount, unitPrice) {
        // Funcion de inicialización de los atributos necesarios para que la aplicación funcione.
        this.name = name;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.subtotal = this.unitPrice * this.amount;
        if (this.name in unitaryProducts) this.units = "ud";
        else this.units = "Kg";}
    floatToStringWithComa(number) {
        // Una función para pasar de float a string usando la coma en lugar del punto para separar la parte entera de la decimal.
        return number.toFixed(2).replaceAll(".", ",")}
}