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
            if (y==0.0){
                printError(0.0, printResult);
            }
            else{
                compute(x,y,division,printResult);
            }
            break;
    }
    
}

function compute(x, y, operationCB, printResultsCB){
    resetWarning();
    printResultsCB(operationCB(x,y));
}

function printResult(total){
    document.getElementById('resultado').innerHTML = total.toFixed(2);
}

function printError(total, printResultsCB){
    document.getElementById('warning').innerHTML = "No está permitida la division por 0.";
    printResultsCB(total)
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
