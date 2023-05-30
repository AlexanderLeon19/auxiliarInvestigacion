import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-componente',
  templateUrl: './crear-componente.component.html',
  styleUrls: ['./crear-componente.component.css']
})
export class CrearComponenteComponent {
  productoId: string;
  nombreComponente: string = '';
  cantidadComponente: number = 0;

  constructor(private route: ActivatedRoute, private productoService: ProductoService, private router: Router) {
    this.productoId = this.route.snapshot.paramMap.get('id')!;
}

  crearComponente(): void {
    this.productoService.agregarComponente(this.productoId, { nombre: this.nombreComponente, cantidad: this.cantidadComponente }).subscribe(producto => {
      this.nombreComponente = '';
      this.cantidadComponente = 0;
    });
  }

  regresar(): void {
    this.router.navigate(['/ver-producto', this.productoId]);
  }
  
}
