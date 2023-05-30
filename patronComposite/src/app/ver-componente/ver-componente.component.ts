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
  componente: Componente = { nombre: '', cantidad: 0 };

  constructor(private route: ActivatedRoute, private productoService: ProductoService) {
    this.productoId = this.route.snapshot.paramMap.get('productoId')!;
    this.componenteId = this.route.snapshot.paramMap.get('componenteId')!;
  }

  ngOnInit(): void {
    this.getComponente();
  }

  getComponente(): void {
    this.productoService.getProducto(this.productoId).subscribe(producto => {
      if (producto.componentes) {  // primero verificar si los componentes existen
        const componenteEncontrado = producto.componentes.find(componente => componente._id === this.componenteId);
        if (componenteEncontrado) { // luego verificar si se encontró el componente
          this.componente = componenteEncontrado;
        } else {
        }
      } else {
      }
    });
  }
}
