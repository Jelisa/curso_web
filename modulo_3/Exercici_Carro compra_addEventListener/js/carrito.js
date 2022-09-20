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
    () => {
        //Recogemos todas las imágenes que actuan de botón y les añadimos la funcionalidad usando addEventListener.
        for (let producto of document.querySelectorAll(".productos")) {
            producto.addEventListener(
                "click",
                (e) => {
                    addProduct(producto.children[0])
                }
            )
        }
        const parentContainer = document.querySelector("h1").parentNode;
        console.log(parentContainer)
        const loginButton = document.createElement("pato")
        parentContainer.insertBefore(loginButton, document.querySelector("h1"))
    }
)

function checkAmountInput(valueToCheck, checkType, errorMsg = "default") {
    let isCorrect = true;
    switch (errorMsg) {
        case "modification":
            errorMsg = "La cantidad no se modificará, ya que ha introducido una cantidad incorrecta.";
            break;
        case "intNeeded":
            errorMsg = "El producto seleccionado se vende por unidades, la cantidad introducida no es válida.";
            break;
        default:
            errorMsg = "El producto seleccionado no se añadirá al carro de la compra porque ha introducido un 0 o un valor no válido como cantidad.";

    }
    switch (checkType) {
        case "isNumberBiggerThanZero":
            if (valueToCheck <= 0.0 || isNaN(valueToCheck)) {
                alert(errorMsg);
                isCorrect = false
            }
            break;
        case "isInt":
            if (!Number.isInteger(valueToCheck)) {
                alert(errorMsg);
                isCorrect = false;
            }
            break;
        case "isNumber":
            if (valueToCheck < 0.0 || isNaN(valueToCheck)) {
                alert(errorMsg);
                isCorrect = false
            }
            break;
    }
    return isCorrect
}

function addProduct(productInfo) {
    /*Esta función añade un producto al carro de la compra.
        Recibe: un elemento HTML que contiene toda la información del producto necesaria.
        No devuelve nada.
    */

    let name = productInfo.getAttribute("nombre");
    let precio = productInfo.getAttribute("precio");
    let units = productInfo.getAttribute("unidad");

    // Se le pide al usuario que introduzca una cantidad del producto seleccionado.
    let quantity = parseFloat(prompt(`Ha elegido ${name} a ${precio}${units}\n¿Qué cantidad desea comprar?`));

    //Comprovar si la cantidad es correcta.
    let correctQuantity = true;
    if (!checkAmountInput(quantity, "isNumberBiggerThanZero")) {
        correctQuantity = false;
    }
    if (correctQuantity && units == "unidad" && !checkAmountInput(quantity, "isInt", "intNedded")) {
        correctQuantity = false;
    }
    if (correctQuantity) {
        if (shoppedProducts.some(product => product.name == name)) {
            // Si el producto ya está seleccionado se modifica la cantidad.
            let productToModify = shoppedProducts[shoppedProducts.findIndex(product => product.name == name)]
            productToModify.uppdateQuantity(productToModify.amount + quantity);
        }
        else {
            // Se genera un objeto de la clase producto con los datos del HTML y se añade a la lista de productos comprados.
            shoppedProducts.push(new Product(name, quantity, precio, units));
        }
        //Se actualiza el carrito de la compra.
        updateShoppingCart();
    }
}

function updateShoppingCart() {
    //Función que actualiza el carrito de la compra.
    let shoppingcartElements = `<div>
                                    <div id='carrito' class='row'>
                                        <div class="col text-start h4">Producto</div>
                                        <div class="col text-start h4">Cantidad</div>
                                        <div class="col text-start h4">Precio</div>
                                        <div class="col text-end h4">Total</div>
                                        <div class="col-1 h4"></div>
                                    </div>`
    let total = 0.0
    for (i in shoppedProducts) {
        shoppingcartElements += shoppedProducts[i].productToHTML(i);
        total += shoppedProducts[i].subtotal;
    }
    shoppingcartElements += `<p class="total col-11 text-end">${total.toFixed(2)}€<p>
                            </div>
                            
                            <div class="row">
                                <div class="col text-end">
                                    <a href="#productos" class="btn btn-primary btn-lg">Seguir comprando</a>
                                </div>
                                <div class="col text-end">
                                    <a href="php/index.php" class="btn btn-primary btn-lg" title="Acabar la compra y pagar">Realizar Compra</a>
                                </div>
                            </div>`
    document.getElementById("carrito").innerHTML = shoppingcartElements;
    addFunctionToDeleteButtons();
    addFunctionModifyQuantity();
}

function addFunctionToDeleteButtons() {
    let delete_buttons = document.querySelectorAll(".delete_button");
    if (!delete_buttons.length) {
        document.getElementById("carrito").innerHTML = '<p id="carrito">Ha vaciado el carrito.</p>'
    }
    else {
        for (let buton of delete_buttons) {
            buton.addEventListener(
                'click',
                () => {
                    shoppedProducts.splice(buton.getAttribute("itemId"), 1)
                    updateShoppingCart();
                }
            )
        }
    }
}

function addFunctionModifyQuantity() {
    const cantidades = document.querySelectorAll(".quantity");
    for (q of cantidades) {
        // console.log(3,q.getAttribute("itemId"),document.querySelector(`div[itemId="${q.getAttribute("itemId")}"]`))
        q.addEventListener(
            'click',
            (e) => {
                let idx = e.target.getAttribute("itemId");
                let new_amount = parseFloat(
                    prompt(
                        `Alcutalmente tiene seleccionada la siguiente cantidad: ${shoppedProducts[idx].amount} ${shoppedProducts[idx].units}(es) de ${shoppedProducts[idx].name}\n¿Quanta quiere tener?\n(Si introduce 0 se eliminará el producto)`
                    )
                )
                // Comprobamos que la cantidad introducida sea válida.
                let correctInput = true;
                if (!checkAmountInput(new_amount, "isNumber", "modification")) {
                    correctInput = false;
                }
                if (correctInput && shoppedProducts[idx].units == "unidad") {
                    if (!checkAmountInput(new_amount, "isInt", "intNeeded")) {
                        correctInput = false;
                    }
                }
                if (correctInput) {
                    if (new_amount == 0) {
                        shoppedProducts.splice(idx, 1);
                        updateShoppingCart();
                    }
                    else {
                        shoppedProducts[idx].uppdateQuantity(new_amount);
                        updateShoppingCart();
                    }
                }
            }
        )
    }
}

function addEndShoppingFunction() {
    const finishButton = document.getElementById("endShopping");
    finishButton.addEventListener("click", removeShoppingOptions())
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

    uppdateQuantity(new_amount) {
        this.amount = new_amount;
        this.subtotal = parseFloat(this.unitPrice) * parseFloat(this.amount);
    }

    productToHTML(idx) {
        return `<div class="row carrito_item">
            <div class="col user-select-none text-start" itemId="${idx}">${this.name} </div> 
            <div class="col user-select-none text-start quantity" itemId="${idx}">${this.amount.toFixed(1)} ${this.units}(es)</div> 
            <div class="col user-select-none text-start" itemId="${idx}">${this.unitPrice}€/${this.units}</div>
            <div class="col user-select-none text-end" itemId="${idx}">${this.subtotal.toFixed(2)}€</div>
            <div class="col-1 user-select-none delete_button text-start" itemId="${idx}"> X</div>
        </div>`
    }
}

