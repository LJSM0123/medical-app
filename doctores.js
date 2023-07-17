document.addEventListener('DOMContentLoaded', function () {
  // Verificar si el formulario existe antes de agregar el evento submit
  var formDoctor = document.getElementById('formDoctor');
  if (formDoctor) {
    formDoctor.addEventListener('submit', function (event) {
      event.preventDefault();

      var nombre = document.getElementById('nombreDoctor').value;
      var apellido = document.getElementById('apellidoDoctor').value;
      var especialidad = document.getElementById('especialidadDoctor').value;
      var consultorio = document.getElementById('consultorioDoctor').value;
      var correo = document.getElementById('correoDoctor').value;

      var data = {
        nombre: nombre,
        apellido: apellido,
        especialidad: especialidad,
        consultorio: consultorio,
        correo: correo,
      };

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/doctores', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          alert('Doctor guardado exitosamente');
          document.getElementById('formDoctor').reset();
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }

  // Obtener el listado de doctores al cargar la página
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/doctores', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var listadoDoctores = document.getElementById('listadoDoctores');

      if (listadoDoctores) { // Verificar si el elemento existe antes de actualizar su contenido
        listadoDoctores.innerHTML = ''; // Limpiar la lista antes de agregar los elementos

        data.forEach(function (doctor) {
          var li = document.createElement('li');
          li.textContent =
            doctor.nombre +
            ' ' +
            doctor.apellido +
            ' - Especialidad: ' +
            doctor.especialidad;
          listadoDoctores.appendChild(li);
        });
      }
    }
  };
  xhr.send();
});
