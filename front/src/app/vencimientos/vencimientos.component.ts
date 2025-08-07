import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { vencimientos, totalPorPropiedad } from 'interfaces/facturaInterface';

@Component({
  selector: 'app-vencimientos',
  templateUrl: './vencimientos.component.html',
  styleUrls: ['./vencimientos.component.css']
})
export class VencimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre_propiedad', 'nom_servicio', 'nom_empresa', 'importe', 'fecha_venc', 'acciones'];
  vencimientos: vencimientos[] = [];
  totalesPorPropiedad: totalPorPropiedad [] = [];
  totalGeneral: number = 0;

  constructor(private facturaService: FacturaService) {}

  ngOnInit() {
    this.cargarVencimientos();
  }

  cargarVencimientos() {
    this.facturaService.getVencimientos().subscribe(data => {
      this.vencimientos = data[0];
      this.calcularTotales();
    });
  }

  calcularTotales() {
    // Calcular totales por propiedad
    const totalesMap = this.vencimientos.reduce((acc, vencimiento) => {
      const prop = vencimiento.nombre_propiedad;
      acc[prop] = (acc[prop] || 0) + vencimiento.importe;
      return acc;
    }, {} as { [key: string]: number });

    // Convertir el mapa a un array de TotalPorPropiedad
    this.totalesPorPropiedad = Object.keys(totalesMap).map((nombre_propiedad) => ({
      nombre_propiedad,
      total: totalesMap[nombre_propiedad]
    }));

    // Calcular el total general
    this.totalGeneral = this.vencimientos.reduce((acc, vencimiento) => acc + vencimiento.importe, 0);
  }

  pagarFactura(cod_factura: string) {
    this.facturaService.pagarFactura(cod_factura).subscribe(() => {
      this.cargarVencimientos();
    });
  }
}