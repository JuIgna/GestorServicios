const sequelize = require('../config/db');
const Factura = require('../models/factura');

const getFuturosVencimientos = async () => {
  const [results] = await sequelize.query('EXEC ObtenerFuturosVencimientos');
  return results;
};

const marcarComoPagada = async (cod_factura) => {
  return await Factura.update({ pago: 's' }, { where: { cod_factura } });
};

const crearFactura = async (datos) => {
  return await Factura.create(datos);
};

module.exports = { getFuturosVencimientos, marcarComoPagada, crearFactura };