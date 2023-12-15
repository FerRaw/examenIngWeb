import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OauthService } from '../../services/oauth.service'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pujar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './pujar.component.html',
  styleUrl: './pujar.component.css',
  providers: [OauthService]
})
export class PujarComponent {

  pujas: any[] = [];
  productoId: any;
  ultimaPuja: any;
  producto: any;
  imagenes: any[] = [];
  valorPuja: any;
  valorMinimo: any;
  valorInput: any;

  constructor(
    private http: HttpClient, 
    private oauth: OauthService, 
    private router: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.productoId = params['id'];
    });

    this.oauth.getPujas(this.productoId).subscribe((data: any) => {
      if (data.length > 0) {
        this.pujas = data;
        this.ultimaPuja = this.pujas[this.pujas.length - 1];
        this.valorPuja = this.ultimaPuja.cantidadOfrecida;
        console.log(this.pujas);
      }

    });

    this.oauth.getProducto(this.productoId).subscribe((data: any) => {
      this.producto = data;
      this.imagenes = this.producto.imagenes;
      console.log(this.producto);
    });
  }

  crearPuja(): void {
    console.log(this.valorInput > this.valorPuja) ;
    if (this.valorInput > this.valorPuja /*&& this.producto.vendedor != localStorage.getItem("email")*/){
      console.log("entra");
      const puja = {
        "identificador": this.productoId,
        "comprador": localStorage.getItem("email"),
        "cantidadOfrecida": this.valorInput
      };
      this.oauth.crearPuja(puja).subscribe((res) => {
        console.log(res);
        alert("Puja realizada con éxito");
        this.ngOnInit();
      });
    } else {
      alert("El valor de la puja debe ser mayor al valor mínimo");
    }
  }
  

}
