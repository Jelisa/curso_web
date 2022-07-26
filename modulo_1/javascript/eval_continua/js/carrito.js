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

//Variables en las que guardaremos los productos seleccionados, son generales pq se necesitan en varios sitios
var selectedProducts = [];
var productUnitPrice = [];
var productQuantity = [];
var productTotalPrice = [];
var unitaryProducts = ["pinya"]

function addProduct(producName) {
    let quantity = parseFloat(prompt("Qué cantidad desea comprar?"));
    if (quantity != 0.0 && !isNaN(quantity)) {
        let priceValue = getProductPrice(document.getElementById(producName).innerHTML);
        selectedProducts.push(producName);
        productUnitPrice.push(priceValue);
        productQuantity.push(quantity)
    }
    else {
        alert("El producto seleccionado será ignorado porque ha introducido un 0 o un valor no válido como cantidad.")
    }
    // console.log(selectedProducts, productUnitPrice, productTotalPrice)
    continueShopping();
    updateShoppingCart(selectedProducts, productQuantity, productUnitPrice);
}

function getProductPrice(string) {
    let price = parseFloat(string.split(":")[1].split('€')[0].replaceAll(",", "."));
    if (isNaN(price)) {
        alert("Update the function to get the Price from the HTML, it isn't working properly");
        return 0.0;
    }
    else return price;
}

function continueShopping() {
    let exit = confirm("Quiere finalizar su compra?");
    if (exit) {
        for (x of document.getElementsByClassName("imatges")) {
            x.onclick = function () { };
        }
    }
}

function updateShoppingCart(products, quantities, unitPrice) {
    let total = 0.0;
    let shoppingCartItems = "";
    let units;
    for (let i = 0; i < products.lenght; i++){
        if (products[i] in unitaryProducts) units = "ud";
        else units = "Kg";
        let subtotal = quantities[i]*unitPrice[i];
        shoppingCartItems += `<p>
                            ${products[i]} ${quantities[i]} ${units} x ${unitPrice[i]}€/${units} = ${subtotal}€
                            </p>`;
    }
    document.getElementById("carrito").innerHTML = shoppingCartItems;
}
