const express = require('express');
const sequelize = require('./config/db');
const facturaRoutes = require('./routes/facturaRoutes');
const cors = require('cors'); // Agregamos cors

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
})); // Habilitamos cors para nuestro front
app.use(express.json());
app.use('/api', facturaRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a DB exitosa');
    app.listen(3000, () => {
      console.log('Servidor corriendo en puerto 3000');
    });
  } catch (err) {
    console.error('Error en la conexión:', err);
    process.exit(1);
  }
};

startServer();