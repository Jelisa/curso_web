const test = require('node:test')
const assert = require('node:assert')

test('Ejemplo de test', () => {
    assert.equal(22, calculaEdad('2000-11-11'), 'no son iguales');
});


test('Ejemplo de test2', () => {
    assert.equal(21, calculaEdad('2000-11-12'), 'no son iguales');
});

test("Testear objetos", () => {
    assert.deepEqual({nombre:"maria"}, {nombre:"Maria"}, "Error en el objeto")
})

// console.log(calculaEdad('2000-11-12'));
function calculaEdad(fecha) {
    const fechaNacimiento = new Date(fecha)
    const today = new Date();
    const anyoActual = today.getFullYear();
    const anyoNacimiento = fechaNacimiento.getFullYear();
    let edad = anyoActual - anyoNacimiento;

    if (fechaNacimiento.getMonth() > today.getMonth()) {
        edad--;
    } else if (fechaNacimiento.getMonth() == today.getMonth() && fechaNacimiento.getDate() > today.getDate()) {
        edad--;
    }
    return edad;
}