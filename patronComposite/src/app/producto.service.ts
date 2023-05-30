import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  private productosUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) { }

  private productos: Producto[] = [];

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.productosUrl, producto);
  }

  editarProducto(id: string, producto: Producto): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.put<Producto>(url, producto);
  }

  eliminarProducto(id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.delete<Producto>(url);
  }

  getProducto(id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  agregarComponente(id: string, componente: { nombre: string, cantidad: number }): Observable<Producto> {
    const url = `${this.productosUrl}/${id}/componentes`;
    return this.http.post<Producto>(url, componente);
  }
  
  eliminarComponente(id: string, componenteId: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}/componentes/${componenteId}`;
    return this.http.delete<Producto>(url);
  }  
  
  editarComponente(id: string, componenteId: string, componente: { nombre: string, cantidad: number }): Observable<Producto> {
    const url = `${this.productosUrl}/${id}/componentes/${componenteId}`;
    return this.http.put<Producto>(url, componente);
  }
  
  agregarComponenteNivel2(id: string, componenteId: string, componente: { nombre: string, cantidad: number }): Observable<Producto> {
    const url = `${this.productosUrl}/${id}/componentes/${componenteId}/componentes`;
    return this.http.post<Producto>(url, componente);
  }
  
}
