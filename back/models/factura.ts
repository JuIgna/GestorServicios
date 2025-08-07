import { DataTypes } from "sequelize";
import sequelize from '../config/db';

export const Factura = sequelize.define('Factura', {
  nro_factura: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  codBarra: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  nro_propiedad: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'Facturas',
  timestamps: false
});

module.exports = Factura;