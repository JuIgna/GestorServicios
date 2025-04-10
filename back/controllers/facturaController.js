const facturaService = require('../services/facturaService');

const getVencimientos = async (req, res) => {
  const vencimientos = await facturaService.obtenerVencimientos();
  return res.json(vencimientos);
};

const markAsPaid = async (req, res) => {
  const { cod_factura } = req.params;
  try {
    await facturaService.pagarFactura(cod_factura);
    return res.json({ message: 'Factura marcada como pagada' });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const addFactura = async (req, res) => {
  try {
    const nuevaFactura = await facturaService.agregarFactura(req.body);
    return res.status(201).json(nuevaFactura);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { getVencimientos, markAsPaid, addFactura };