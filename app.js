const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {})
.then(() => {
  console.log('Conexión exitosa a la base de datos');
})
.catch((error) => {
  console.error('Error al conectar a la base de datos:', error);
});

// Middleware para manejar las rutas definidas en routes.js
app.use('/api', routes);

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
