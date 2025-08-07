import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VencimientosComponent } from './vencimientos/vencimientos.component';
import { NuevaFacturaComponent } from './nueva-factura/nueva-factura.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [AppComponent, VencimientosComponent, NuevaFacturaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,        // Para peticiones HTTP
    FormsModule,            // Para formularios con ngModel
    BrowserAnimationsModule, // Requerido por Angular Material
    MatTableModule,         // Tabla de Material
    MatButtonModule,        // Botones de Material
    MatFormFieldModule,     // Campos de formulario
    MatInputModule,
    MatMenuModule,
    MatToolbarModule         // Inputs de Material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}