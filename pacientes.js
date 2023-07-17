// Obtener el listado de pacientes al cargar la página
function obtenerPacientes() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/pacientes', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var listadoPacientes = document.getElementById('listadoPacientes');
      if (listadoPacientes) {
        listadoPacientes.innerHTML = '';

        data.forEach(function (paciente) {
          var li = document.createElement('li');
          li.textContent =
            paciente.nombre +
            ' ' +
            paciente.apellido +
            ' - Edad: ' +
            paciente.edad;
          listadoPacientes.appendChild(li);
        });
      }
    }
  };
  xhr.send();
}

// Escuchar el evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  obtenerPacientes();

  // Enviar el formulario de pacientes
  var formPaciente = document.getElementById('formPaciente');
  if (formPaciente) {
    formPaciente.addEventListener('submit', function (event) {
      event.preventDefault();

      var nombre = document.getElementById('nombrePaciente').value;
      var cedula = document.getElementById('cedulaPaciente').value;
      var apellido = document.getElementById('apellidoPaciente').value;
      var edad = document.getElementById('edadPaciente').value;
      var telefono = document.getElementById('telefonoPaciente').value;

      // Validar campos requeridos
      if (!nombre || !cedula || !apellido || !edad || !telefono) {
        alert('Por favor, complete todos los campos requeridos');
        return;
      }

      var data = {
        nombre: nombre,
        cedula: cedula,
        apellido: apellido,
        edad: edad,
        telefono: telefono,
      };

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/pacientes', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          alert('Paciente guardado exitosamente');
          document.getElementById('formPaciente').reset();
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }
});

// Exportar la función obtenerPacientes
module.exports = {
  obtenerPacientes
};
