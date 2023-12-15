import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OauthComponent } from '../oauth/oauth.component'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppModule } from '../../app.module';
import { OauthService } from '../../services/oauth.service';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, AppModule, HttpClientModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css',
  providers: [OauthService],
})
export class CrearProductoComponent {

  selectedFiles: File[] = [];
  urls: any[] = [];
  fotos_subidas: boolean = false;
  tagsInput: string = "";
  error_empty_field: boolean = false;
  error_precio: boolean = false;
  error_fotos: boolean = false;
  error_fecha: boolean = false;
  producto_creado: boolean = false;
  producto_en_proceso: boolean = false;
  error_general: boolean = false;

  evento = {
    organizador: localStorage.getItem('email'),
    nombre: '',
    timestamp: 0,
    imagenes:[] as any,
    lugar: '',

  };

  constructor(
    private http: HttpClient,
    private oauth: OauthService,
    private router : Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.fotos_subidas = false;
    this.producto_creado = false;
    console.log("holaholaohla")
  }

  onSubmit() {
    // Reiniciar errores
    console.log(this.evento);
    this.error_empty_field = false;
    this.error_precio = false;
    this.error_fotos = false;
    this.error_fecha = false;
    this.error_general = false;

    // Get today's date
      console.log(this.evento);
      this.producto_en_proceso = true;

      this.oauth.createEvento(this.evento).subscribe(
        (createdProduct) => {
          console.log('Product created:', createdProduct);
          this.producto_en_proceso = false;
          this.producto_creado = true;
        },
        (error) => {
          console.error('Error creating product:', error);
          this.producto_en_proceso = false;
          this.error_general = true;
        }
      );
    //this.router.navigate(['/eventos']);
  }

  onButtonVolverClick() : void {
    this.router.navigate(['/']);
  }

  // Cloudinary
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
      console.log(this.selectedFiles);
    }
  }

  onButtonClicked(): void {
    if (this.selectedFiles.length > 0) {
      this.oauth.uploadImage(this.selectedFiles).subscribe(response => {
        if (response) {
          this.urls = response.urls;
          this.evento.imagenes = this.urls;
          this.fotos_subidas = true;
        }
      });
    }
  }

  signOut(): void{
    this.authService.signOut();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("photoUrl");
    location.reload();
  }

}
