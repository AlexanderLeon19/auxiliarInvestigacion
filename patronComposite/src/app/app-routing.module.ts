import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { CrearComponenteComponent } from './crear-componente/crear-componente.component';
import { VerComponenteComponent } from './ver-componente/ver-componente.component';
import { EditarComponenteComponent } from './editar-componente/editar-componente.component';

const routes: Routes = [
  { path: '', component: ProductoComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'editar-producto/:id', component: EditarProductoComponent },
  { path: 'ver-producto/:id', component: VerProductoComponent },
  { path: 'ver-componente/:productoId/:componenteId', component: VerComponenteComponent },
  { path: 'crear-componente/:productoId', component: CrearComponenteComponent },
  { path: 'crear-componente/:productoId/:componenteId', component: CrearComponenteComponent },
  { path: 'crear-componente/:productoId/:path', component: CrearComponenteComponent },
  { path: 'editar-componente/:productoId/:componenteId', component: EditarComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


