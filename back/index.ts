import express from 'express';
import sequelize from './config/db';
import facturaRoutes from './routes/facturaRoutes';
import cors from 'cors';
import { FacturaRepository } from "./repositories/facturaRepository";
console.log("FacturaRepository en index:", FacturaRepository);
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
}));

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
