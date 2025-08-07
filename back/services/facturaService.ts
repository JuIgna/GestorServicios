import { vencimientos } from "../interfaces/facturaInterface";
import { FacturaRepository } from "../repositories/facturaRepository";
import sequelize from "../config/db";

export class FacturaService {
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
            MONTH(f.fecha_venc) = MONTH(GETDATE()) AND YEAR(f.fecha_venc) = YEAR(GETDATE()) -- vencimientos del mes
            -- AND f.pago = 0                        -- No pagadas
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

// const pagarFactura = async (cod_factura) => {
//   const factura = await Factura.findByPk(cod_factura);
//   if (!factura) throw new Error('Factura no encontrada');
//   if (factura.pago === 's') throw new Error('La factura ya está pagada');
//   return await facturaRepository.marcarComoPagada(cod_factura);
// };

// const agregarFactura = async (datos) => {
//   const { cod_factura, cod_propiedad, nro_empresa, cod_servicio, importe, fecha_venc } = datos;
//   if (!cod_factura || !cod_propiedad || !nro_empresa || !cod_servicio || !importe || !fecha_venc) {
//     throw new Error('Faltan datos obligatorios');
//   }
//   return await facturaRepository.crearFactura(datos);
// };

// module.exports = { obtenerVencimientos, pagarFactura, agregarFactura };