import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private myAppUrl = 'https://productoprueba.azurewebsites.net/';
  private myApiUrl = 'api/producto/';
  constructor(private http: HttpClient) {}

  GetListProductos(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  deleteProducto(id:number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveProducto(producto: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, producto);
  }

  updateProducto(id: number, producto: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, producto);
  }
}
