import { Component } from '@angular/core';
import { FacturaService } from '../services/factura.service';

@Component({
  selector: 'app-nueva-factura',
  templateUrl: './nueva-factura.component.html',
  styleUrls: ['./nueva-factura.component.css']
})
export class NuevaFacturaComponent {
  nuevaFactura = {
    cod_factura: '',
    cod_propiedad: '',
    nro_empresa: 0,
    cod_servicio: '',
    importe: 0,
    fecha_venc: ''
  };

  constructor(private facturaService: FacturaService) {}

  agregarFactura() {
    this.facturaService.agregarFactura(this.nuevaFactura).subscribe(() => {
      this.nuevaFactura = { cod_factura: '', cod_propiedad: '', nro_empresa: 0, cod_servicio: '', importe: 0, fecha_venc: '' };
    });
  }
}