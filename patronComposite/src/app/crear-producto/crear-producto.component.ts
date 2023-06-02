import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  nombreProducto: string = '';
  tamanoLote: string = '';
  tiempoSuministro: number = 0;
  inventarioDisponible: number = 0;
  inventarioSeguridad: number = 0;
  recepcionesProgramadas: number = 0;

  constructor(private productoService: ProductoService, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
  }
  crearProducto(): void {
    this.productoService.agregarProducto({ 
      nombre: this.nombreProducto,
      tamanoLote: this.tamanoLote,
      tiempoSuministro: this.tiempoSuministro,
      inventarioDisponible: this.inventarioDisponible,
      inventarioSeguridad: this.inventarioSeguridad,
      recepcionesProgramadas: this.recepcionesProgramadas
    }).subscribe(producto => {
      this.nombreProducto = '';
      this.tamanoLote = '';
      this.tiempoSuministro = 0;
      this.inventarioDisponible = 0;
      this.inventarioSeguridad = 0;
      this.recepcionesProgramadas = 0;
      this.snackBar.open('¡Producto creado exitosamente!', 'Cerrar', {
        duration: 3000
      });
    });
  }  
}
