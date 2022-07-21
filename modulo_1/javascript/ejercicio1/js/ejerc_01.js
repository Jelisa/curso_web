
function isNumber(input){
    let numberPattern = /[0-9]+/g;
    return numberPattern.test(input);
}


// function askForNumbersOnOneString(){
//     let input = window.prompt("Introduce 4 números separados por un espacio:")
//     let arrayOfNumbers = []
//     console.log("hola", input.split(' '))
//     for (x of input.split(' ')){
//         arrayOfNumbers.push(parseInt(x))
//     }
//     console.log(arrayOfNumbers)
//     return arrayOfNumbers;
// }

// function askForOnly4Numbers(){
//     let arrayOfNumbers = []
//     const numberOfIters = 4;
//     for (let i = numberOfIters; i > 0 ; i--){
//         arrayOfNumbers.push(parseInt(
//             window.prompt(`Introduce 1 número te faltan ${i-1} para acabar:`)
//         ))
//     }
//     return arrayOfNumbers
// }

function askForXNumbersExtraFunction(iters){
    let arrayOfNumbers = []
    for (let i = iters; i > 0 ; i--){
        let input = window.prompt(`Introduce 1 número te faltan ${i-1} para acabar:`);
        if (isNumber(input)){
            arrayOfNumbers.push(parseInt(input));
        }
        else{
            alert(`Your last input wasn't a number it will not be used.`);
            i++;
        }
    }
    return arrayOfNumbers;
}

function askForXNumbers(iters){
    let arrayOfNumbers = []
    for (let i = iters; i > 0 ; i--){
        let input = parseInt(window.prompt(`Introduce 1 número te faltan ${i-1} para acabar:`));
        if (isNaN(input)){
            alert(`Your last input wasn't a number it will not be used.`);
            i++;
        }
        else{
            arrayOfNumbers.push(parseInt(input));
        }
    }
    return arrayOfNumbers;
}

function suma_array(lista) {
    /*Función para sumar los elementos de una array*/
    let respuesta = 0;
    for (let x of lista) {
        respuesta += x;
    }
    return respuesta;
}

const iteraciones = 4;

document.getElementById("respuesta").innerHTML = suma_array(askForXNumbers(iteraciones));
