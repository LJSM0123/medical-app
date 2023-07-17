const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/restapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function () {
  console.log('Conexión exitosa a MongoDB');
});

// Definir los esquemas de los modelos
const doctorSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  especialidad: String,
  consultorio: String,
  correo: String,
}, {
  collection: 'doctores' // Nombre personalizado de la colección
});

const pacienteSchema = new mongoose.Schema({
  nombre: String,
  cedula: String,
  apellido: String,
  edad: Number,
  telefono: String,
}, {
  collection: 'pacientes' // Nombre personalizado de la colección
});

const citaSchema = new mongoose.Schema({
  numeroDocumentoPaciente: String,
  especialidad: String,
}, {
  collection: 'citas' // Nombre personalizado de la colección
});

// Crear los modelos basados en los esquemas
const Doctor = mongoose.model('Doctor', doctorSchema);
const Paciente = mongoose.model('Paciente', pacienteSchema);
const Cita = mongoose.model('Cita', citaSchema);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

// Ruta para guardar un nuevo doctor
app.post('/doctores', (req, res) => {
  const { nombre, apellido, especialidad, consultorio, correo } = req.body;

  const doctor = new Doctor({
    nombre,
    apellido,
    especialidad,
    consultorio,
    correo,
  });

  doctor.save()
    .then((doctorGuardado) => {
      console.log('Doctor guardado:', doctorGuardado);
      res.status(200).send('Doctor guardado exitosamente');
    })
    .catch((err) => {
      console.error('Error al guardar el doctor:', err);
      res.status(500).send('Error al guardar el doctor');
    });
});

// Ruta para obtener el listado de doctores
app.get('/doctores', (req, res) => {
  Doctor.find({})
    .exec()
    .then((doctores) => {
      res.status(200).json(doctores);
    })
    .catch((err) => {
      console.error('Error al obtener los doctores:', err);
      res.status(500).send('Error al obtener los doctores');
    });
});

// Ruta para guardar un nuevo paciente
app.post('/pacientes', (req, res) => {
  const { nombre, cedula, apellido, edad, telefono } = req.body;

  const paciente = new Paciente({
    nombre,
    cedula,
    apellido,
    edad,
    telefono,
  });

  paciente.save()
    .then((pacienteGuardado) => {
      console.log('Paciente guardado:', pacienteGuardado);
      res.status(200).send('Paciente guardado exitosamente');
    })
    .catch((err) => {
      console.error('Error al guardar el paciente:', err);
      res.status(500).send('Error al guardar el paciente');
    });
});

// Ruta para obtener el listado de pacientes
app.get('/pacientes', (req, res) => {
  Paciente.find({})
    .exec()
    .then((pacientes) => {
      res.status(200).json(pacientes);
    })
    .catch((err) => {
      console.error('Error al obtener los pacientes:', err);
      res.status(500).send('Error al obtener los pacientes');
    });
});

// Ruta para guardar una nueva cita
app.post('/citas', (req, res) => {
  const { numeroDocumentoPaciente, especialidad } = req.body;

  const cita = new Cita({
    numeroDocumentoPaciente,
    especialidad,
  });

  cita.save()
    .then((citaGuardada) => {
      console.log('Cita guardada:', citaGuardada);
      res.status(200).send('Cita guardada exitosamente');
    })
    .catch((err) => {
      console.error('Error al guardar la cita:', err);
      res.status(500).send('Error al guardar la cita');
    });
});

// Ruta para obtener el listado de citas
app.get('/citas', (req, res) => {
  Cita.find({})
    .exec()
    .then((citas) => {
      res.status(200).json(citas);
    })
    .catch((err) => {
      console.error('Error al obtener las citas:', err);
      res.status(500).send('Error al obtener las citas');
    });
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
