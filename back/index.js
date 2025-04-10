const express = require('express');
const sequelize = require('./config/db');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Backend funcionando!');
});

// Función para iniciar el servidor solo si la DB está conectada
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a DB exitosa');
    app.listen(3000, () => {
      console.log('Servidor corriendo en puerto 3000');
    });
  } catch (err) {
    console.error('Error en la conexión:', err);
    process.exit(1); // Termina el proceso si la conexión falla
  }
};

startServer();