import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = { 
    nombre: '', 
    tamanoLote: '',
    tiempoSuministro: 0,
    inventarioDisponible: 0,
    inventarioSeguridad: 0,
    recepcionesProgramadas: 0,
  };
  id: string = '';

  constructor(private productoService: ProductoService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.productoService.getProducto(this.id).subscribe(producto => {
      this.producto = producto || { 
        nombre: '', 
        tamanoLote: '',
        tiempoSuministro: 0,
        inventarioDisponible: 0,
        inventarioSeguridad: 0,
        recepcionesProgramadas: 0,
      };
    });
  }

  editarProducto(): void {
    this.productoService.editarProducto(this.id, this.producto).subscribe(producto => {
      this.snackBar.open('¡Producto actualizado exitosamente!', 'Cerrar', {
        duration: 3000
      });
      this.router.navigate(['/']);
    });
  }
}
