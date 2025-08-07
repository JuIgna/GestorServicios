// facturaRoutes.ts
import express from 'express';
import { getVencimientos } from '../controllers/facturaController';

const router = express.Router();

router.get('/vencimientos', getVencimientos);
// router.put('/facturas/:cod_factura/pagar', markAsPaid);
// router.post('/facturas', addFactura);

export default router;
