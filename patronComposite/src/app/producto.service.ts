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


  //-------------------------PRODUCTOS-------------------------
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

  //-------------------------COMPONENTES DE NIVEL 1-------------------------
  agregarComponente(idProducto: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes`;
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

  getProducto(id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  editarComponente(idProducto: string, idComponente: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}`;
    return this.http.put<Producto>(url, componente);
  }

  getComponente(idProducto: string, idComponente: string): Observable<Componente> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}`;
    return this.http.get<Componente>(url);
  }


  //-------------------------COMPONENTES DE NIVEL 2-------------------------
  agregarComponenteNivel2(idProducto: string, idComponente: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/componentes`;
    return this.http.post<Producto>(url, componente);
  }

  eliminarComponenteNivel2(productoId: string, componenteId: string, componenteNivel2Id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${productoId}/componentes/${componenteId}/componentesNivel2/${componenteNivel2Id}`;
    return this.http.delete<Producto>(url).pipe(
      catchError((error) => {
        console.error(`Error al eliminar componente de nivel 2: ${error.message}`);
        return throwError(error);
      })
    );
  }

  editarComponenteNivel2(idProducto: string, idComponente: string, idComponenteNivel2: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/${idComponenteNivel2}`;
    return this.http.put<Producto>(url, componente);
  }

  getComponenteNivel2(idProducto: string, idComponente: string, idComponenteNivel2: string): Observable<Componente> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/${idComponenteNivel2}`;
    return this.http.get<Componente>(url);
  }

  agregarComponenteNivel3(idProducto: string, idComponente: string, idComponenteNivel2: string, componente: any): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/componentes/${idComponenteNivel2}/componentes`;
    return this.http.post<Producto>(url, componente);
  }
  
  eliminarComponenteNivel3(productoId: string, componenteId: string, componenteNivel2Id: string, componenteNivel3Id: string): Observable<Producto> {
    const url = `${this.productosUrl}/${productoId}/componentes/${componenteId}/componentesNivel2/${componenteNivel2Id}/componentesNivel3/${componenteNivel3Id}`;
    return this.http.delete<Producto>(url).pipe(
      catchError((error) => {
        console.error(`Error al eliminar componente de nivel 3: ${error.message}`);
        return throwError(error);
      })
    );
  }

  editarComponenteNivel3(
    idProducto: string,
    idComponente: string,
    idComponenteNivel2: string,
    idComponenteNivel3: string,
    componente: any
  ): Observable<Producto> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/${idComponenteNivel2}/${idComponenteNivel3}`;
    return this.http.put<Producto>(url, componente);
  }
  
  getComponenteNivel3(
    idProducto: string,
    idComponente: string,
    idComponenteNivel2: string,
    idComponenteNivel3: string
  ): Observable<Componente> {
    const url = `${this.productosUrl}/${idProducto}/componentes/${idComponente}/${idComponenteNivel2}/${idComponenteNivel3}`;
    return this.http.get<Componente>(url);
  }
  

}
