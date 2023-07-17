document.addEventListener('DOMContentLoaded', function () {
  // Obtener el listado de citas al cargar la página
  function obtenerCitas() {
    var listadoCitas = document.getElementById('listadoCitas');
    if (!listadoCitas) {
      console.error('Elemento listadoCitas no encontrado');
      return;
   }
    listadoCitas.innerHTML = '';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/citas', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        data.forEach(function (cita) {
          var li = document.createElement('li');
          li.textContent = 'Paciente: ' + cita.numeroDocumentoPaciente + ' - Especialidad: ' + cita.especialidad;
          listadoCitas.appendChild(li);
        });
      }
    };
    xhr.send();
  }

  obtenerCitas();

  // Enviar el formulario de citas
  var formCita = document.getElementById('formCita');
  if (!formCita) {
    console.error('Elemento formCita no encontrado');
    return;
  }

  formCita.addEventListener('submit', function (event) {
    event.preventDefault();

    var numeroDocumentoPaciente = document.getElementById('numeroDocumentoPaciente').value;
    var especialidad = document.getElementById('especialidadCita').value;

    // Validar campos requeridos
    if (!numeroDocumentoPaciente || !especialidad) {
      alert('Por favor, complete todos los campos requeridos');
      return;
    }

    var data = {
      numeroDocumentoPaciente: numeroDocumentoPaciente,
      especialidad: especialidad,
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/citas', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
        alert('Cita guardada exitosamente');
        formCita.reset();
        obtenerCitas(); // Actualizar el listado de citas después de guardar una nueva
      }
    };
    xhr.send(JSON.stringify(data));
  });
});
