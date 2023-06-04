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
  componenteNivel2Id: string;
  componenteNivel3Id: string;
  componente: Componente = {
    nombre: '',
    cantidad: 0,
    tamanoLote: '',
    tiempoSuministro: 0,
    inventarioDisponible: 0,
    inventarioSeguridad: 0,
    recepcionesProgramadas: 0
  };

  constructor(private route: ActivatedRoute, private router: Router, private productoService: ProductoService, private snackBar: MatSnackBar) {
    this.productoId = this.route.snapshot.paramMap.get('productoId')!;
    this.componenteId = this.route.snapshot.paramMap.get('componenteId')!;
    this.componenteNivel2Id = this.route.snapshot.paramMap.get('componenteNivel2Id')!;
    this.componenteNivel3Id = this.route.snapshot.paramMap.get('componenteNivel3Id')!;
  }

  ngOnInit(): void {
    if (this.componenteNivel3Id) {
      this.productoService.getComponenteNivel3(this.productoId, this.componenteId, this.componenteNivel2Id, this.componenteNivel3Id).subscribe((componente: Componente) => {
        this.componente = componente;
      });
    } else if (this.componenteNivel2Id) {
      this.productoService.getComponenteNivel2(this.productoId, this.componenteId, this.componenteNivel2Id).subscribe((componente: Componente) => {
        this.componente = componente;
      });
    } else {
      this.productoService.getComponente(this.productoId, this.componenteId).subscribe((componente: Componente) => {
        this.componente = componente;
      });
    }
  }

  editarComponente(): void {
    if (this.componenteNivel3Id) {
      this.productoService.editarComponenteNivel3(this.productoId, this.componenteId, this.componenteNivel2Id, this.componenteNivel3Id, this.componente)
        .subscribe(
          () => {
            this.snackBar.open('¡Componente de nivel 3 actualizado exitosamente!', 'Cerrar', {
              duration: 3000
            });
            this.regresar();
          },
          error => {
            this.snackBar.open('Hubo un error al actualizar el componente de nivel 3', 'Cerrar', {
              duration: 3000
            });
            console.error(error);
          }
        );
    } else if (this.componenteNivel2Id) {
      this.productoService.editarComponenteNivel2(this.productoId, this.componenteId, this.componenteNivel2Id, this.componente)
        .subscribe(
          () => {
            this.snackBar.open('¡Componente de nivel 2 actualizado exitosamente!', 'Cerrar', {
              duration: 3000
            });
            this.regresar();
          },
          error => {
            this.snackBar.open('Hubo un error al actualizar el componente de nivel 2', 'Cerrar', {
              duration: 3000
            });
            console.error(error);
          }
        );
    } else {
      this.productoService.editarComponente(this.productoId, this.componenteId, this.componente)
        .subscribe(
          () => {
            this.snackBar.open('¡Componente actualizado exitosamente!', 'Cerrar', {
              duration: 3000
            });
            this.regresar();
          },
          error => {
            this.snackBar.open('Hubo un error al actualizar el componente', 'Cerrar', {
              duration: 3000
            });
            console.error(error);
          }
        );
    }
  }


  regresar(): void {

    if (this.componenteNivel3Id) {
      this.router.navigate(['/ver-componente', this.productoId, this.componenteId, this.componenteNivel2Id]);
    }
    else if (this.componenteNivel2Id) {
      // Cuando estamos editando un componente de nivel 2, regresamos a 'ver-componente'
      this.router.navigate(['/ver-componente', this.productoId, this.componenteId]);
    } else {
      // Cuando estamos editando un componente de nivel 1, regresamos a 'ver-producto'
      this.router.navigate(['/ver-producto', this.productoId]);
    }
  }
}  