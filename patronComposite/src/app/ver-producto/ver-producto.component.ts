import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {
  producto: Producto = { nombre: '', componentes: [] };
  idComponenteEditar: string = '';
  nombreComponenteEditar: string = '';
  cantidadComponenteEditar: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.productoService.getProducto(id)
        .subscribe(producto => this.producto = producto);
    }
  }

  eliminarComponente(componenteId: string): void {
    if (this.producto._id) {
      this.productoService.eliminarComponente(this.producto._id, componenteId)
        .subscribe(producto => {
          this.producto = producto;
        });
    } else {
      console.error("El ID del producto no está definido");
    }
  }

  activarEdicionComponente(id: string, nombre: string, cantidad: number): void {
    this.idComponenteEditar = id;
    this.nombreComponenteEditar = nombre;
    this.cantidadComponenteEditar = cantidad;
  }

  editarComponente(): void {
    if (this.producto._id) {
      this.productoService.editarComponente(this.producto._id, this.idComponenteEditar, { nombre: this.nombreComponenteEditar, cantidad: this.cantidadComponenteEditar })
        .subscribe(producto => {
          this.producto = producto;
          this.idComponenteEditar = '';
        });
    }
    
  }
}
