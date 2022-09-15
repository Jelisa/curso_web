
computeButton = document.querySelector("#botonCalculo");

computeButton.addEventListener("click", getData);

function getData(){
    // Read the form data
    let operacion = document.querySelector("input[name=operacion]:checked").value;
    let x = parseFloat(document.querySelector("input[name=value1]").value);
    let y = parseFloat(document.querySelector("input[name=value2]").value);

    switch (operacion){
        case "suma":
            compute(x,y,suma,printResult);
            break;
        case "resta":
            compute(x,y,resta,printResult);
            break;
        case "multiplicacion":
            compute(x,y,multiplicacion,printResult);
            break;
        case "division":
            compute(x,y,division,printResult, division_error);
            break;
    }
}

function compute(x, y, operationCB, printResultsCB, errorHandling){
    /**
     * x, y son dos valores que se pasaran a la función de la operationCB
     * printResultsCB una funcion para mostrar el resultado de la operación.
     * errorHandlign es una funcion que recibe dos parámetros y tiene que devolver verdadero o falso.
     */
    resetWarning();
    let correctOperation;
    if (errorHandling !== undefined){
        correctOperation = errorHandling(x,y);
    }
    else{
        correctOperation = true; 
    }
    if (correctOperation){
        printResultsCB(operationCB(x,y));
    }
}

function printResult(total){
    document.getElementById('resultado').innerHTML = total.toFixed(2);
}

function printError(total, printResultsCB, errorMessage){
    document.getElementById('warning').innerHTML = errorMessage;
    printResultsCB(total);
}

function resetWarning(){
    //reset the warning to an empty string 
    document.getElementById('warning').innerHTML = ""; 
}

function suma(x, y){
    return x+y;
}

function resta(x, y){
    return x-y;
}

function multiplicacion(x, y){
    return x*y;
}

function division(x, y){
    return x/y;
}

function division_error(n1, n2){
    // Recive dos parámetros aunque solo necesite uno por igualdad con otras posibles funciones de comprovación de errores.
    if (n2 == 0){
        printError(0.0, printResult, "No está permitida la division por 0.");
        return false;
    }
    else{
        return true;
    }
}
