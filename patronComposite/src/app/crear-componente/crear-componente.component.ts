import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-componente',
  templateUrl: './crear-componente.component.html',
  styleUrls: ['./crear-componente.component.css']
})
export class CrearComponenteComponent {
  productoId: string;
  componenteId?: string;
  nombreComponente: string = '';
  cantidadComponente: number = 0;

  tamanoLote: string = '';
  tiempoSuministro: number = 0;
  inventarioDisponible: number = 0;
  inventarioSeguridad: number = 0;
  recepcionesProgramadas: number = 0;

  constructor(private route: ActivatedRoute, private productoService: ProductoService, private router: Router, private snackBar: MatSnackBar) {
    this.productoId = this.route.snapshot.paramMap.get('productoId')!;
    this.componenteId = this.route.snapshot.paramMap.get('componenteId')!;
  }

  crearComponente(): void {
    const nuevoComponente = {
      nombre: this.nombreComponente,
      cantidad: this.cantidadComponente,
      tamanoLote: this.tamanoLote,
      tiempoSuministro: this.tiempoSuministro,
      inventarioDisponible: this.inventarioDisponible,
      inventarioSeguridad: this.inventarioSeguridad,
      recepcionesProgramadas: this.recepcionesProgramadas
    };
    if (this.componenteId) {
      this.productoService.agregarComponenteNivel2(this.productoId, this.componenteId, nuevoComponente).subscribe(producto => {
        this.nombreComponente = '';
        this.cantidadComponente = 0;
        this.tamanoLote = '';
        this.tiempoSuministro = 0;
        this.inventarioDisponible = 0;
        this.inventarioSeguridad = 0;
        this.recepcionesProgramadas = 0;
        this.snackBar.open('¡Componente de segundo nivel creado exitosamente!', 'Cerrar', {
          duration: 3000
        });
      });
    } else {
      this.productoService.agregarComponente(this.productoId, nuevoComponente).subscribe(producto => {
        this.nombreComponente = '';
        this.cantidadComponente = 0;
        this.tamanoLote = '';
        this.tiempoSuministro = 0;
        this.inventarioDisponible = 0;
        this.inventarioSeguridad = 0;
        this.recepcionesProgramadas = 0;
        this.snackBar.open('¡Componente creado exitosamente!', 'Cerrar', {
          duration: 3000
        });
      });
    }
  }

  regresar(): void {
    if (this.componenteId) {
      // Si existe un componenteId, entonces regresamos al componente
      this.router.navigate(['/ver-componente', this.productoId, this.componenteId]);
    } else {
      // Si no existe un componenteId, entonces regresamos al producto
      this.router.navigate(['/ver-producto', this.productoId]);
    }
  }

}
