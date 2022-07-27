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

// Variable en la que guardaremos los productos seleccionados
var shoppedProducts = [];
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
    
    //Si la cantidad no es válida se da un mensaje avisando de que el producto no será añadido.
    if (quantity == 0.0 || isNaN(quantity)) {
        alert("El producto seleccionado no se añadirá al carro de la compra porque ha introducido un 0 o un valor no válido como cantidad.")
    }
    //Si la cantidad es correcta.
    else {
        // Se genera un objeto de la clase producto.
        let productToAdd = new Product(productName, quantity, getProductPrice(document.getElementById(productName).innerHTML));
        // Se actualiza el carrito de la compra.
        updateShoppingCart(productToAdd);
    }
    // Se pregunta si se quiere seguir comprando.
    continueShopping();
}

function getProductPrice(string) {
    /*Una función para extraer el precio del cuerpo del documento HTML aprovechando el patrón del precio
    y da una alerta si este proceso no funciona
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
    /*Esta función pregunta al usuario si quiere finalizar la compra o no y desactiva la aplicación.*/
    let exit = confirm("¿Quiere finalizar su compra?");

    // si el usuario quiere salir
    if (exit) {
        // le avisamos de que ha finalizado
        alert("Compra Finalizada");
        deactivateImages();
    }
}

function deactivateImages(){
    /* Esta función elimina la funcionalidad de las imagenes de añadir elementos al carrito de la compra */
    for (x of document.getElementsByClassName("imatges")) {
        x.onclick = function () { };
    }
}

function updateShoppingCart(productToUpdate) {
    /*Función que actualiza el carrito de la compra.*/
    //Creamos e inicializamos una variable para guardar la lista de la compra.
    document.getElementById("carrito").innerHTML += `<p>${productToUpdate.toShoppingCartString()}</p>`;
    total += productToUpdate.subtotal;
    document.getElementById("total").innerHTML = `<h2>Total Compra: ${total.toFixed(2).replaceAll(".", ",")}</h2>`;
}

class Product {
    constructor(name, unitPrice, amount) {
        // Funcion de inicialización de los atributos necesarios para que la aplicación funcione.
        this.name = name;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.subtotal = this.computeSubtotal();
        this.units = this.setUnits();
    }
    computeSubtotal(){
        // Función para calcular el precio total del producto 
        return this.unitPrice * this.amount;
    }
    setUnits() {
        /*Esta función establece las unidades del producto.*/
        //Si se trata de un producto que va por unidades se usa ud como unidad
        if (this.name in unitaryProducts) this.units = "ud";
        //Para el resto de productos se usa Kg como unidad.
        else this.units = "Kg";
    }
    floatToStringWithComa(number) {
        // Una función para pasar de float a string usando la coma en lugar del punto para separar la parte entera de la decimal.
        return number.toFixed(2).replaceAll(".", ",")
    }
    toShoppingCartString() {
        // función que convierte el objeto en una string con el formato necesario para el carrito de la compra
        this.setUnits();
        return `
            ${this.name} ${this.amount} ${this.units} x ${this.floatToStringWithComa(this.unitPrice)}€/${this.units} = 
            ${this.floatToStringWithComa(this.subtotal)}€
        `;
    }
}