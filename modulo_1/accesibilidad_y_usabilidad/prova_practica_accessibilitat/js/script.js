
function comprobarDatos(){
    /* A function to check the validity of the data.*/

    let name = document.getElementById('nombre').value;
    const numbersAndSimbols = /[0-9\[\]\{\}\\\|\%\&\/\(\)\=\?\¿\·\$\!\*\<\>]+/i; // prohibited symbols in the name
    let opinion = document.getElementById('opinion').value;
    let inputIsCorrect = true;

    // Check that name is not an empty string, it contains at least one alphanumerical symbol and 
    // that it doesn't contain the prohibited symbols
    if (!name.trim() || !/\w+/.test(opinion) || numbersAndSimbols.test(name)){ 
        alert("El nombre es de obligatorio cumplimiento para enviar una opinión. No valen los nombres con números, ni símbolos.");
        inputIsCorrect = false;
    }

    // Check that the opinion is not an empty string and it contains at least one alphanumerical symbol.
    if(!opinion.trim() || !/\w+/.test(opinion)){
        alert("Si desea enviar una opinión esta ha de contener almenos un caracter alfanumérico.")
        inputIsCorrect = false;
    }

    //If both the name and the opinion fields are correct print an alert telling that everything went smoothly.
    if (inputIsCorrect){
        alert("Su opinión ha sido enviada.");
    }

    return inputIsCorrect;
}