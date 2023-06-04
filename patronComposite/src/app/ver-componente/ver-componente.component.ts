import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Componente } from '../producto';

@Component({
  selector: 'app-ver-componente',
  templateUrl: './ver-componente.component.html',
  styleUrls: ['./ver-componente.component.css']
})

export class VerComponenteComponent implements OnInit {

  productoId: string = '';
  componenteId: string = '';
  componenteNivel2Id: string = '';
  componenteNivel3Id: string = '';

  mostrarComponenteNivel2: boolean = false;
  mostrarComponenteNivel3: boolean = false;

  componente: Componente = {
    nombre: '',
    cantidad: 0,
    componentes: [],
    tamanoLote: '',
    tiempoSuministro: 0,
    inventarioDisponible: 0,
    inventarioSeguridad: 0,
    recepcionesProgramadas: 0
  };

  componenteNivel2: Componente = {
    nombre: '',
    cantidad: 0,
    componentes: [],
    tamanoLote: '',
    tiempoSuministro: 0,
    inventarioDisponible: 0,
    inventarioSeguridad: 0,
    recepcionesProgramadas: 0
  };

  componenteNivel3: Componente = {
    nombre: '',
    cantidad: 0,
    componentes: [],
    tamanoLote: '',
    tiempoSuministro: 0,
    inventarioDisponible: 0,
    inventarioSeguridad: 0,
    recepcionesProgramadas: 0
  };


  constructor(private route: ActivatedRoute, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productoId = params.get('productoId')!;
      this.componenteId = params.get('componenteId')!;
      this.componenteNivel2Id = params.get('componenteNivel2Id')!;
      this.componenteNivel3Id = params.get('componenteNivel3Id')!;
      this.getComponente();
      if(this.componenteNivel3Id){
        this.getComponenteNivel3();
      }
      else if (this.componenteNivel2Id) {
        this.getComponenteNivel2();
      }
    });
  }

  getComponente(): void {
    this.productoService.getProducto(this.productoId).subscribe(producto => {
      if (producto.componentes) {
        const componenteEncontrado = producto.componentes.find(componente => componente._id === this.componenteId);
        if (componenteEncontrado) {
          this.componente = componenteEncontrado;
        } else {
        }
      } else {
      }
    });
  }

  getComponenteNivel2(): void {
    this.mostrarComponenteNivel2 = true;
    this.productoService.getComponenteNivel2(this.productoId, this.componenteId, this.componenteNivel2Id)
      .subscribe(componente => {
        this.componenteNivel2 = componente;
      });
  }

  eliminarComponenteNivel2(componenteNivel2Id: string): void {
    this.productoService.eliminarComponenteNivel2(this.productoId, this.componenteId, componenteNivel2Id)
      .subscribe(producto => {
        this.componente = producto.componentes?.find(componente => componente._id === this.componenteId) ?? this.componente;
      });
  }


  eliminarComponenteNivel3(componenteNivel3Id: string): void {
    this.productoService.eliminarComponenteNivel3(this.productoId, this.componenteId, this.componenteNivel2Id, componenteNivel3Id)
      .subscribe(producto => {
        // Actualiza los datos del componente de nivel 2 después de eliminar el componente de nivel 3
        if (this.componenteNivel2) {
          this.componenteNivel2.componentes = this.componenteNivel2.componentes?.filter(componente => componente._id !== componenteNivel3Id);
        }
      });
  }
  
  getComponenteNivel3(): void {
    this.mostrarComponenteNivel3 = true;
    this.productoService.getComponenteNivel3(this.productoId, this.componenteId, this.componenteNivel2Id, this.componenteNivel3Id )
      .subscribe(componente => {
        this.componenteNivel3 = componente;
      });
  }
  
  
}
