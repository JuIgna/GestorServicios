import { Request, Response } from 'express';
import { FacturaService } from '../services/facturaService';

export const getVencimientos = async (req: Request, res: Response): Promise<Response> => {
  const vencimientos = await FacturaService.getVencimientos();
console.log("HOLA")
  return res.json(vencimientos);
};

// export const markAsPaid = async (req: Request, res: Response): Promise<Response> => {
//   const { cod_factura } = req.params;

//   try {
//     await FacturaService.pagarFactura(cod_factura);
//     return res.json({ message: 'Factura marcada como pagada' });
//   } catch (err: any) {
//     return res.status(400).json({ error: err.message });
//   }
// };

// export const addFactura = async (req: Request, res: Response): Promise<Response> => {
//   try {
//     const nuevaFactura = await FacturaService.agregarFactura(req.body);
//     return res.status(201).json(nuevaFactura);
//   } catch (err: any) {
//     return res.status(400).json({ error: err.message });
//   }
// };
