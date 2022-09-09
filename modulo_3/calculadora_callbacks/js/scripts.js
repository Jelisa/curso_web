function calcular(){

    document.getElementById('warning').innerHTML = ""; //reset the warning to empty 

    
    // Read the form data
    let operacion = document.querySelector("input[name=operacion]:checked").value;
    let x = parseFloat(document.querySelector("input[name=value1]").value);
    let y = parseFloat(document.querySelector("input[name=value2]").value);

    // Define a variable to read 
    let resultado;

    switch (operacion){
        case "suma":
            resultado = suma(x,y);
            break;
        case "resta":
            resultado = resta(x,y);
            break;
        case "multiplicacion":
            resultado = multiplicacion(x,y);
            break;
        case "division":
            if (y==0.0){
                document.getElementById('warning').innerHTML = "No está permitida la division por 0.";
                resultado = 0.0;
            }
            else{
                resultado = division(x,y)
            }
            break;
    }
    document.getElementById('resultado').innerHTML = resultado.toFixed(2);
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
