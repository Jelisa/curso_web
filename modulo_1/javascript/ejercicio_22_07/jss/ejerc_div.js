let numbers = [1, 10, 14, 9, 5, 6];

console.log("Suma números impares: ", sumOddNumbers(numbers));

console.log("Suma de posiciones pares: ", sumEvenPositions(numbers));


function sumOddNumbers (array2Add){
    let sum = 0;
    for (x of array2Add) { // usamos el for para recorrer el array 
        if (x % 2 == 1) { // comprueba si el valor de la posición i es impar
            sum += x; // suma el valor de la posición i
        }
    }
    return sum;
}

function sumEvenPositions (array2Add){
    let sum = 0;
    for (let i = 0; i < array2Add.length; i++) {
        if (i % 2 == 0) sumEvenPositions += numbers[i];
    }
    return sum;
}