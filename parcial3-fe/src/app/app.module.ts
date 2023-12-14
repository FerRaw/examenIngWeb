import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

import { InicioEmtComponent } from './features/inicio-emt/inicio-emt.component';

@NgModule({
  declarations: [
    InicioEmtComponent
    // ... otros componentes, directivas, pipes
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de incluir ReactiveFormsModule aquí
    // ... otros módulos
  ],
  bootstrap: [InicioEmtComponent]
})
export class AppModule { }
