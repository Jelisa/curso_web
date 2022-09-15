/*
Hay que programar un carrito de compra de fruta.

Hay que programar la compra con el carrito:

1) SIN TOCAR EL HTML

2) Usando addEventListener

En la parte inferior debe aparecer la lista de la compra
con un icono que permita eliminar ese elemento de la lista.
El total se debe recalcular.

Igual que la sección con las frutas es responsive, la lista también debe serlo

*/

// Variable general que contiene los elemento añadidos al carrito.
var shoppedProducts = [];

window.addEventListener(
    "load",
    () =>{
    //Recogemos todas las imágenes que actuan de botón y les añadimos la funcionalidad usando addEventListener.
        for (let producto of document.querySelectorAll(".productos")){
            // console.log(producto.children[0].getAttribute("nombre"))
            producto.addEventListener(
                "click",
                (e) => {
                    addProduct(producto.children[0])
                }
            )
        }
    }
)

function addProduct(productId) {
    /*Esta función añade un producto al carro de la compra.
        Recibe: el nombre de un producto.
        No devuelve nada.*/

    let name = productId.getAttribute("nombre");
    let precio = productId.getAttribute("precio");
    let units = productId.getAttribute("unidad");

    // Se le pide al usuario que introduzca una cantidad del producto seleccionado.
    let quantity = parseFloat(prompt(`Ha elegido ${name} a ${precio}${units}\n¿Qué cantidad desea comprar?`));
    if (quantity <= 0.0 || isNaN(quantity)) {
        alert("El producto seleccionado no se añadirá al carro de la compra porque ha introducido un 0 o un valor no válido como cantidad.")
    }
    //Si la cantidad es correcta.
    else {
        // Se genera un objeto de la clase producto con los datos del HTML.
        shoppedProducts.push(new Product(name, quantity, precio, units))
        //Se actualiza el carrito de la compra.
        updateShoppingCart();
    }
    // Se pregunta si se quiere seguir comprando.
    // continueShopping();
}


function removeShoppingOptions() {
    /* Esta función elimina la funcionalidad de las imagenes de añadir elementos al carrito de la compra y de los botones de borrar elementos */
    for (let x of document.getElementsByClassName("fruits_button")) x.onclick = function () { };
    for (let x of document.getElementsByClassName("delete_button")) x.innerHTML="";
}

function updateShoppingCart() {
    // console.log(shoppedProducts)
    //Función que actualiza el carrito de la compra.
    let shoppingcartElements = `<div>
                                    <div id='carrito' class='row '>
                                    <div class="col text-start">Producto</div>
                                    <div class="col text-start">Cantidad</div>
                                    <div class="col text-start">Precio</div>
                                    <div class="col text-end">Total</div>
                                    <div class="col text-end"></div>`
    let total = 0.0
    for (let i = 0; i < shoppedProducts.length; i++) {
        shoppingcartElements += `<div class="row carrito_item">${shoppedProducts[i].toShoppingCartString()} 
                                <div class="col"><button type="button" class="delete_button btn" itemId="${i}">X</button></div></div>`;
        total += shoppedProducts[i].subtotal;
    }
    shoppingcartElements += `<p class="total text-end">${total.toFixed(2)}<p></div>`
    document.getElementById("carrito").innerHTML = shoppingcartElements;
    addFunctionToDeleteButtons();
}

function addFunctionToDeleteButtons(){
    let delete_buttons = document.querySelectorAll(".delete_button");
    if (!delete_buttons.length){
        document.getElementById("carrito").innerHTML = '<p id="carrito">Ha vaciado el carrito.</p>'
    }
    else{
        for (let buton of delete_buttons){
            // console.log(buton)
            buton.addEventListener(
                'click',
                () =>{
                    shoppedProducts.splice(buton.getAttribute("itemId"), 1)
                    updateShoppingCart();
                }
            )
        }
    }
}


class Product {
    /*Una clase para modelar los diferentes productos*/
    constructor(name, amount, unitPrice, units) {
        // Funcion de inicialización de los atributos necesarios para que la aplicación funcione.
        this.name = name;
        this.unitPrice = unitPrice;
        this.amount = amount;
        this.subtotal = parseFloat(this.unitPrice) * parseFloat(this.amount);
        this.units = units;
    }
    floatToStringWithComa(number) {
        console.log('a', typeof(number))
        // Una función para pasar de float a string usando la coma en lugar del punto para separar la parte entera de la decimal.
        return number.toFixed(2).replaceAll(".", ",")
    }
    toShoppingCartString() {
        // función que convierte el objeto en una string con el formato necesario para el carrito de la compra
        return `<div class="col text-start">${this.name} </div> 
                <div class="col text-start">${this.amount} Kilo(es)</div> 
                <div class="col text-start">${this.unitPrice}€/${this.units}</div>
                <div class="col text-end">${this.subtotal.toFixed(2)}€</div>`;
    }
}

