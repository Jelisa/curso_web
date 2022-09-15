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

/* Funcionalidad del carrito de la compra */

// Variable que contiene aquellos productos que van por unidades en lugar de por Kg.
var unitaryProducts = ["pinya", "piña", "manzana verde"];
// Variable que contiene el total de la compra.
// var total = 0.0;
var shoppedProducts = [];


//Recogemos todas las imágenes que actuan de botón y les añadimos la funcionalidad usando addEventListener.
let productosDisponibles = document.querySelectorAll(".fruits_button");

for (let producto of productosDisponibles){
    producto.addEventListener("click",() => {addProduct(producto.title)})
}

function addProduct(productId) {
    console.log("here", productId)
    /*Esta función añade un producto al carro de la compra.
    Recibe: el nombre de un producto.
    No devuelve nada.*/
    // Se le pide al usuario que introduzca una cantidad del producto seleccionado.
    let quantity = parseFloat(prompt("Qué cantidad desea comprar?"));
    if (quantity <= 0.0 || isNaN(quantity)) {
        alert("El producto seleccionado no se añadirá al carro de la compra porque ha introducido un 0 o un valor no válido como cantidad.")
    }
    //Si la cantidad es correcta.
    else {
        let productDescription = document.getElementById(productId).innerHTML;
        // Se genera un objeto de la clase producto con los datos del HTML.
        //Se actualiza el carrito de la compra.
        shoppedProducts.push(new Product(getProductName(productDescription), quantity, getProductPrice(productDescription)))
        updateShoppingCart();
    }
    // Se pregunta si se quiere seguir comprando.
    continueShopping();
}

function getProductName(string){
    /*Una función para extraer el nombre del producto de la descripción */
    return string.split(":")[0].trim()
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
        return 0.0;
    }
    // En caso contrario devuelve el precio en formato float.
    else return price;
}

function continueShopping() {
    //Esta función pregunta al usuario si quiere finalizar la compra o no y desactiva la aplicación.
    if (confirm("¿Quiere finalizar su compra?")) {
        alert("Compra Finalizada");
        removeShoppingOptions();
    }
}

function removeShoppingOptions() {
    /* Esta función elimina la funcionalidad de las imagenes de añadir elementos al carrito de la compra y de los botones de borrar elementos */
    for (let x of document.getElementsByClassName("fruits_button")) x.onclick = function () { };
    for (let x of document.getElementsByClassName("delete_button")) x.innerHTML="";
}

function updateShoppingCart() {
    //Función que actualiza el carrito de la compra.
    let shoppingcartElements = "<ul id='carrito'>"
    let total = 0.0
    for (let i = 0; i < shoppedProducts.length; i++) {
        shoppingcartElements += `<li class="shopping_list_element">${shoppedProducts[i].toShoppingCartString()} <button class="delete_button" onclick="delete_element(${i})">X</button> </li>`;
        total += shoppedProducts[i].subtotal;
    }
    shoppingcartElements += "</ul>"
    document.getElementById("carrito").innerHTML = shoppingcartElements;
    document.getElementById("total").innerHTML = `<h3>Total Compra: ${total.toFixed(2).replaceAll(".", ",")}</h3>`;
}

function delete_element(index) {
    shoppedProducts.splice(index, 1);
    updateShoppingCart();
}

class Product {
    /*Una clase para modelar los diferentes productos*/
    constructor(name, amount, unitPrice) {
        // Funcion de inicialización de los atributos necesarios para que la aplicación funcione.
        this.name = name;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.subtotal = this.unitPrice * this.amount;
        // console.log("test 1", `'${this.name.toLowerCase()}', ${unitaryProducts}`, this.name.toLowerCase() in unitaryProducts)
        if (this.name.toLowerCase() in unitaryProducts) this.units = "ud";
        else this.units = "Kg";
    }
    floatToStringWithComa(number) {
        // Una función para pasar de float a string usando la coma en lugar del punto para separar la parte entera de la decimal.
        return number.toFixed(2).replaceAll(".", ",")
    }
    toShoppingCartString() {
        // función que convierte el objeto en una string con el formato necesario para el carrito de la compra
        return `${this.name} ${this.amount} ${this.units} x ${this.floatToStringWithComa(this.unitPrice)}€/${this.units} =  ${this.floatToStringWithComa(this.subtotal)}€`;
    }
}


/* Funcionalidades de los formularios */

function checkNames(name){
    if (!name.trim() || !/\w+/.test(opinion) || numbersAndSimbols.test(name)){ 
        alert("El nombre es de obligatorio cumplimiento para enviar una opinión. No valen los nombres con números, ni símbolos.");
        return false;}
    else{ return true;}
}

function checkTexts(text){
    if(!opinion.trim() || !/\w+/.test(opinion)){
        alert("Si desea enviar una opinión esta ha de contener almenos un caracter alfanumérico.")
        return false
    }
    else return true;
}

function comprobarDatos(){
    /* A function to check the validity of the data.*/

    let name = document.getElementById('nombre').value;
    const numbersAndSimbols = /[0-9\[\]\{\}\\\|\%\&\/\(\)\=\?\¿\·\$\!\*\<\>]+/i; // prohibited symbols in the name
    let opinion = document.getElementById('opinion').value;
    let inputIsCorrect = true;

    // Check that name is not an empty string, it contains at least one alphanumerical symbol and 
    // that it doesn't contain the prohibited symbols
    if (checkNames(name)){
        inputIsCorrect = false;
    }

    // Check that the opinion is not an empty string and it contains at least one alphanumerical symbol.
    if (checkTexts(opinion)){
        inputIsCorrect = false;
    }

    //If both the name and the opinion fields are correct print an alert telling that everything went smoothly.
    if (inputIsCorrect){
        alert("Su opinión ha sido enviada.");
    }

    return inputIsCorrect;
}