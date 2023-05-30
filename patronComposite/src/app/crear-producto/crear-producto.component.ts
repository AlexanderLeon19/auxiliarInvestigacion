import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  nombreProducto: string = '';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
  }

  crearProducto(): void {
    this.productoService.agregarProducto({ nombre: this.nombreProducto }).subscribe(producto => {
      this.nombreProducto = '';
    });
  }
  
}
