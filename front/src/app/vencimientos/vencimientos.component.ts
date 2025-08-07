import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura.service';
import { vencimientos } from 'interfaces/facturaInterface';

@Component({
  selector: 'app-vencimientos',
  templateUrl: './vencimientos.component.html',
  styleUrls: ['./vencimientos.component.css']
})
export class VencimientosComponent implements OnInit {
  displayedColumns: string[] = ['nombre_propiedad', 'nom_servicio', 'nom_empresa', 'importe', 'fecha_venc', 'acciones'];
  vencimientos: vencimientos[] = [];

  constructor(private facturaService: FacturaService) {}

  ngOnInit() {
    this.cargarVencimientos();
  }

  cargarVencimientos() {
    this.facturaService.getVencimientos().subscribe(data => {
      console.log (data)
      this.vencimientos = data[0];
      console.log(this.vencimientos);
    });
  }

  pagarFactura(cod_factura: string) {
    this.facturaService.pagarFactura(cod_factura).subscribe(() => {
      this.cargarVencimientos();
    });
  }
}