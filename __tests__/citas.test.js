// Importar la función que se va a probar
const { obtenerCitas } = require('../citas');

// Caso de prueba
test('Debe retornar un array de citas', () => {
  // Simular el resultado esperado
  const expected = [
    { numeroDocumentoPaciente: '123456789', especialidad: 'Cardiología' },
    { numeroDocumentoPaciente: '987654321', especialidad: 'Dermatología' }
  ];

  // Obtener el resultado de la función
  const result = obtenerCitas();

  // Verificar que el resultado sea igual al esperado
  expect(result).toEqual(expected);
});

