const facturaRepository = require('../repositories/facturaRepository');

const obtenerVencimientos = async () => await facturaRepository.getFuturosVencimientos();

const pagarFactura = async (cod_factura) => {
  const factura = await Factura.findByPk(cod_factura);
  if (!factura) throw new Error('Factura no encontrada');
  if (factura.pago === 's') throw new Error('La factura ya está pagada');
  return await facturaRepository.marcarComoPagada(cod_factura);
};

const agregarFactura = async (datos) => {
  const { cod_factura, cod_propiedad, nro_empresa, cod_servicio, importe, fecha_venc } = datos;
  if (!cod_factura || !cod_propiedad || !nro_empresa || !cod_servicio || !importe || !fecha_venc) {
    throw new Error('Faltan datos obligatorios');
  }
  return await facturaRepository.crearFactura(datos);
};

module.exports = { obtenerVencimientos, pagarFactura, agregarFactura };