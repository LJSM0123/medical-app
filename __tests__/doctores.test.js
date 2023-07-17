// Importar la función que se va a probar
const { obtenerDoctores } = require('../doctores');

// Caso de prueba
test('Debe retornar un array de doctores', () => {
  // Simular el resultado esperado
  const expected = [
    { nombre: 'Dr. Juan Pérez', especialidad: 'Cardiología' },
    { nombre: 'Dra. María Gómez', especialidad: 'Dermatología' }
  ];

  // Obtener el resultado de la función
  const result = obtenerDoctores();

  // Verificar que el resultado sea igual al esperado
  expect(result).toEqual(expected);
});
