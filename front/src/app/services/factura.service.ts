import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getVencimientos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vencimientos`);
  }

  pagarFactura(cod_factura: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/facturas/${cod_factura}/pagar`, {});
  }

  agregarFactura(factura: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/facturas`, factura);
  }
}