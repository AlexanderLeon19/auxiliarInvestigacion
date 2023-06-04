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
  componenteId: string;
  componenteNivel2Id?: string;

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
    this.componenteNivel2Id = this.route.snapshot.paramMap.get('componenteNivel2Id')!;
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
    if (this.componenteNivel2Id) {
      // Si existe un componenteNivel2Id, creamos un componente de tercer nivel
      this.productoService.agregarComponenteNivel3(this.productoId, this.componenteId, this.componenteNivel2Id, nuevoComponente).subscribe(producto => {
        this.limpiarFormulario();
        this.snackBar.open('¡Componente de tercer nivel creado exitosamente!', 'Cerrar', {
          duration: 3000
        });
      });
    } else if (this.componenteId) {
      // Si existe un componenteId, creamos un componente de segundo nivel
      this.productoService.agregarComponenteNivel2(this.productoId, this.componenteId, nuevoComponente).subscribe(producto => {
        this.limpiarFormulario();
        this.snackBar.open('¡Componente de segundo nivel creado exitosamente!', 'Cerrar', {
          duration: 3000
        });
      });
    } else {
      // Si no existe un componenteId, creamos un componente de primer nivel
      this.productoService.agregarComponente(this.productoId, nuevoComponente).subscribe(producto => {
        this.limpiarFormulario();
        this.snackBar.open('¡Componente creado exitosamente!', 'Cerrar', {
          duration: 3000
        });
      });
    }
  }

  limpiarFormulario(): void {
    this.nombreComponente = '';
    this.cantidadComponente = 0;
    this.tamanoLote = '';
    this.tiempoSuministro = 0;
    this.inventarioDisponible = 0;
    this.inventarioSeguridad = 0;
    this.recepcionesProgramadas = 0;
  }

  regresar(): void {
    if (this.componenteNivel2Id) {
      // Si existe un componenteNivel2Id, entonces regresamos al componente de nivel 2
      this.router.navigate(['/ver-componente', this.productoId, this.componenteId, this.componenteNivel2Id]);
    } else if (this.componenteId) {
      // Si existe un componenteId, entonces regresamos al componente de primer nivel
      this.router.navigate(['/ver-componente', this.productoId, this.componenteId]);
    } else {
      // Si no existe un componenteId, entonces regresamos al producto
      this.router.navigate(['/ver-producto', this.productoId]);
    }
  }

}

