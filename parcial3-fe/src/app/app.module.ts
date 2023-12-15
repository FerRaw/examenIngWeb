import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  // ... otros módulos
];

@NgModule({
  declarations: [],
  imports: [...modules],
})
export class AppModule { }
