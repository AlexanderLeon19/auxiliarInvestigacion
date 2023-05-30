import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})

export class EditarProductoComponent implements OnInit {
  producto: Producto = { nombre: '' };

  id: string = '';

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    this.productoService.getProductos().subscribe(productos => {
      this.producto = productos.find(p => p._id === this.id) || { nombre: '' };
    });
  }

  editarProducto(): void {
    console.log(`Editing product with ID: ${this.id}`);
    this.productoService.editarProducto(this.id, this.producto).subscribe(producto => {
      this.router.navigate(['/']);
    });
  }
  
}