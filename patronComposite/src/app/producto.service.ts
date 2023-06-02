import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, Componente } from './producto';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  agregarComponente(idProducto: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes`;
    return this.http.post<Producto>(url, componente);
  }

  agregarComponenteNivel2(idProducto: string, idComponente: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/componentes`;
    return this.http.post<Producto>(url, componente);
  }

  eliminarComponente(id: string, componenteId: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}/componentes/${componenteId}`;
    return this.http.delete<Producto>(url).pipe(
      catchError((error) => {
        console.error(`Error al eliminar componente: ${error.message}`);
        return throwError(error);
      })
    );
  }

  getComponente(idProducto: string, idComponente: string): Observable<Componente> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}`;
    return this.http.get<Componente>(url);
  }

  editarComponente(idProducto: string, idComponente: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}`;
    return this.http.put<Producto>(url, componente);
  }

}
