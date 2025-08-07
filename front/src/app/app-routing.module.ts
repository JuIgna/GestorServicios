import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VencimientosComponent } from './vencimientos/vencimientos.component';
import { NuevaFacturaComponent } from './nueva-factura/nueva-factura.component';

const routes: Routes = [
  { path: 'vencimientos', component: VencimientosComponent },
  { path: 'nueva-factura', component: NuevaFacturaComponent },
  { path: '', redirectTo: '/vencimientos', pathMatch: 'full' } // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}