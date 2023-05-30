import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => this.productos = productos);
  }
  
  eliminarProducto(id: string): void {
    this.productoService.eliminarProducto(id).subscribe(producto => {
      this.productos = this.productos.filter(p => p._id !== id);
    });
  }
}
