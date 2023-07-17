// Importar la función que se va a probar
const { obtenerPacientes } = require('../pacientes');

// Caso de prueba
test('Debe retornar un array de pacientes', () => {
    // Simular el resultado esperado
    const expected = [
      { nombre: 'Juan', apellido: 'Pérez', edad: 35 },
      { nombre: 'María', apellido: 'Gómez', edad: 42 }
    ];

    // Obtener el resultado de la función
    const result = obtenerPacientes();

    // Verificar que el resultado sea igual al esperado
    expect(result).toEqual(expected);
  });
