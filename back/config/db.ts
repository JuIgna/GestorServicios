// config/db.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB), // ✅ forzamos a number
  username: process.env.USER_DB,
  password: process.env.USER_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    options: { encrypt: true },
  },
});

export default sequelize;
