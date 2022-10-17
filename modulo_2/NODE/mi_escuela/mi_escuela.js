// Para una escuela de idiomas, hace falta saber:
// 1) que alumnos son menores de edad, ya que se pasa la información de su asistencia a los padres
// 2) que alumnos son mayores de 65, ya que disponen de un descuento en la matrícula, a razón de
// un 5% por cada año que pasen de 64.

const precioBaseMatricula = 250;

// Función que indique para los alumnos menores de edad
// su nombre, cuantos años tienen y cuantos días les faltan para cumplir 18
// De este modo:
// Pepa Pi tienes 17 años y te faltan 32 días para cumplir 18 años.

// Función que indique que alumnos pasan de 65 años, a qué descuento tienen derecho y
// cuanto costaría su matrícula. Por ejemplo:
// Pau Guerra tienes 66 años, tu descuento es del 10% y el importe de tu matrícula es de 225 € 

// const {INFORMACION_ALUMNOS} = require('./alumnos.js')
const {students} = require('./alumnos.js');
console.log("Estudiantes menores de edad:\n -",menoresEdad(students).join("\n - "));
console.log("Estudiantes Jubilados:\n -",precioJubilados(students).join("\n - "));

function menoresEdad(estudiantes){
    let menores = []
    estudiantes.forEach(element => {
        let edad = computeAge(element.fecha_nacimiento);
        if (edad < 18){
            let days_til_majority = computeDaysTilMajor(element.fecha_nacimiento);
            menores.push(`${element.nombre} ${element.apellido} tienes ${edad} años y te faltan ${days_til_majority} días para cumplir 18 años.`)
        }
    });
    return menores
}

function precioJubilados(estudiantes){
    let jubilados = [];
    estudiantes.forEach(element => {
        let edad = computeAge(element.fecha_nacimiento)
        if (edad > 64){
            let descuento = 5 * (edad - 64);
            let precio = precioBaseMatricula * (1 - descuento/100);
            jubilados.push(`${element.nombre} ${element.apellido} tienes ${edad} años, tu descuento es del ${descuento}% y el importe de tu matrícula es de ${precio} €`)
        }
    })
    return jubilados;
}

function computeAge(birthday){
    birthday = new Date(birthday);
    let today = new Date();
    let anyos = today.getFullYear() - birthday.getFullYear();
    if (anyos == 18){
        if (birthday.getMonth() > today.getMonth() ){
            anyos -= 1;
        }
        else if (birthday.getMonth() == today.getMonth()){
            if (birthday.getDate() > today.getDate()){
                anyos -= 1;
            }
        }
    }
    return anyos
}

function computeDaysTilMajor(birthday){
    let today = new Date();
    birthday = new Date(birthday);
    const minorDays = 18*365.25;
    let currentDateDays = (today-birthday)/(1000*60*60*24);
    return Math.round(minorDays - currentDateDays);
}