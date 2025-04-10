const { Sequelize } = require('sequelize');
require('dotenv').config(); // Agrega esta línea al inicio

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.HOST_DB, // Cambia según tu configuración de SQL Server
  port: process.env.PORT_DB,
  username: process.env.USER_DB,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    options: { encrypt: true } // Si usas Azure o necesitas encriptación
  }
});

module.exports = sequelize;