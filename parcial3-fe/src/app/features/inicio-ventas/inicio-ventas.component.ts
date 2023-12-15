import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../../app.module';
import { OauthComponent } from '../oauth/oauth.component'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { OauthService } from '../../services/oauth.service';

@Component({
  selector: 'app-inicio-ventas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './inicio-ventas.component.html',
  styleUrl: './inicio-ventas.component.css',
  providers: [OauthService, DatePipe]
})
export class InicioVentasComponent implements OnInit{

  productos: any[] = [];
  todosProductos: any[] = [];
  busqueda: any;
  constructor(
    private http: HttpClient, 
    private oauth: OauthService, 
    private router: Router,
    private datePie: DatePipe 
  ) {}

  redirectToProduct(productId: any) {
    console.log(productId);
    this.router.navigate(['/articulo', productId])
  }

  ngOnInit() {
    this.oauth.getProductos().subscribe((data: any) => {
      this.productos = data;
      this.todosProductos = data;
      this.productos.forEach((product, index) => {
        this.productos[index].fecha = this.datePie.transform(this.productos[index].fecha, 'yyyy-MM-dd');

        this.oauth.getUltimaPuja(this.productos[index].identificador).subscribe((puja: any) => {
          if (puja) {
            this.productos[index].precioSalida = puja.cantidadOfrecida;
          }
        })
      });
      console.log(this.productos[0].imagenes[0]);
      console.log(this.productos);
    });
  }

  filtroBusqueda(): void {
    console.log(this.busqueda);
    if (this.busqueda == '') {
      this.productos = this.todosProductos;
    } else {
      this.productos = this.todosProductos.filter(producto => producto.descripcion.toLowerCase().includes(this.busqueda.toLowerCase()));
    }
    }
}
