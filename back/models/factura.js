const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Factura = sequelize.define('Factura', {
  cod_factura: {
    type: DataTypes.STRING(50),
    primaryKey: true
  },
  cod_propiedad: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  nro_empresa: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  cod_servicio: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  importe: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fecha_venc: {
    type: DataTypes.DATE,
    allowNull: false
  },
  pago: {
    type: DataTypes.STRING(2),
    allowNull: false,
    defaultValue: 'n'
  }
}, {
  tableName: 'Facturas',
  timestamps: false
});

module.exports = Factura;