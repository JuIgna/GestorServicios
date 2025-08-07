import sequelize from "../config/db";
import { Factura } from '../models/factura';
import { vencimientos } from "../interfaces/facturaInterface";

export class FacturaRepository {
    static async getVencimientos (): Promise <vencimientos[]> {
        try {
        console.log ("llegue al repository ")
        const query = `
            SELECT 
            f.nro_factura,
            f.importe,
            f.fecha_venc,
            p.nombre AS nombre_propiedad,
            p.calle,
            p.altura,
            s.nom_servicio,
            e.nom_empresa
            FROM Facturas f
            JOIN Propiedades p ON f.nro_propiedad = p.nro_propiedad
            JOIN Servicios s ON f.cod_servicio = s.cod_servicio
            JOIN Empresas e ON f.nro_empresa = e.nro_empresa
            WHERE 
            f.fecha_venc >= CAST(GETDATE() AS DATE)  -- Vencimientos a partir de hoy
            AND f.pago = 0                        -- No pagadas
            ORDER BY 
            p.nro_propiedad                        -- Ordenadas por fecha de vencimiento
        `;
        const resultados = await sequelize.query (query);

        console.log("re0s", resultados)

        return resultados as vencimientos[];

        
        } catch (error){
            throw error;
        }

    }
}

const getFuturosVencimientos = async () => {
  const [results] = await sequelize.query('EXEC ObtenerFuturosVencimientos');
  return results;
};

// const marcarComoPagada = async (cod_factura) => {
//   return await Factura.update({ pago: 's' }, { where: { cod_factura } });
// };

// const crearFactura = async (datos) => {
//   return await Factura.create(datos);
// };

module.exports = { getFuturosVencimientos };