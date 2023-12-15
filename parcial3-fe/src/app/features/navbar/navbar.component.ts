import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [HttpClient, HttpClientModule]
})
export class NavbarComponent {
  constructor(
    private router: Router,
  ) {}

  redireccion() {
    console.log("redireccionando");
    this.router.navigate(['/crearProducto']);
  }

}
