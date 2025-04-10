import { Component, OnInit } from '@angular/core';
import { FacturaService } from './services/factura.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['nombre_propiedad', 'nom_servicio', 'nom_empresa', 'importe', 'fecha_venc', 'acciones'];
  vencimientos: any[] = [];
  nuevaFactura = {
    cod_factura: '',
    cod_propiedad: '',
    nro_empresa: 0,
    cod_servicio: '',
    importe: 0,
    fecha_venc: ''
  };

  constructor(private facturaService: FacturaService) {}

  ngOnInit() {
    this.cargarVencimientos();
  }

  cargarVencimientos() {
    this.facturaService.getVencimientos().subscribe(data => {
      console.log('Datos recibidos:', data);
      this.vencimientos = data;
    });
  }

  pagarFactura(cod_factura: string) {
    this.facturaService.pagarFactura(cod_factura).subscribe(() => {
      this.cargarVencimientos();
    });
  }

  agregarFactura() {
    this.facturaService.agregarFactura(this.nuevaFactura).subscribe(() => {
      this.nuevaFactura = { cod_factura: '', cod_propiedad: '', nro_empresa: 0, cod_servicio: '', importe: 0, fecha_venc: '' };
      this.cargarVencimientos();
    });
  }
}