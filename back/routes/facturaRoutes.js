const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.get('/vencimientos', facturaController.getVencimientos);
router.put('/facturas/:cod_factura/pagar', facturaController.markAsPaid);
router.post('/facturas', facturaController.addFactura);

module.exports = router;