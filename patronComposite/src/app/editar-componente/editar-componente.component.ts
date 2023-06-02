import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Componente } from '../producto';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar-componente',
  templateUrl: './editar-componente.component.html',
  styleUrls: ['./editar-componente.component.css']
})

export class EditarComponenteComponent implements OnInit {
  productoId: string;
  componenteId: string;
  componente: Componente = {
    nombre: '',
    cantidad: 0,
    tamanoLote: '',
    tiempoSuministro: 0,
    inventarioDisponible: 0,
    inventarioSeguridad: 0,
    recepcionesProgramadas: 0
  };

  constructor( private route: ActivatedRoute, private router: Router, private productoService: ProductoService,private snackBar: MatSnackBar) {
    this.productoId = this.route.snapshot.paramMap.get('productoId')!;
    this.componenteId = this.route.snapshot.paramMap.get('componenteId')!;
  }

  ngOnInit(): void {
    this.productoService.getComponente(this.productoId, this.componenteId).subscribe((componente: Componente) => {
      this.componente = componente;
    });
  }

  editarComponente(): void {
    this.productoService.editarComponente(this.productoId, this.componenteId, this.componente)
      .subscribe(() => {
        this.snackBar.open('¡Componente actualizado exitosamente!', 'Cerrar', {
          duration: 3000
        });
        this.regresar();
      }, error => {
        this.snackBar.open('Hubo un error al actualizar el componente', 'Cerrar', {
          duration: 3000 
        });
        console.error(error);
      });
  }

  regresar(): void {
    this.router.navigate(['/ver-producto', this.productoId]);
  }
}
