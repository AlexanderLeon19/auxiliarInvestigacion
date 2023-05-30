import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './producto/producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { CrearComponenteComponent } from './crear-componente/crear-componente.component';
import { VerComponenteComponent } from './ver-componente/ver-componente.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    VerProductoComponent,
    CrearComponenteComponent,
    VerComponenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
