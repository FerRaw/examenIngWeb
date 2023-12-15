import { Component, OnInit } from '@angular/core';
import { OauthComponent } from '../oauth/oauth.component';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [OauthComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [OauthComponent]
})
export class NavbarComponent {
  
  loggedIn = localStorage.getItem("token") != null;
  token : any;

  constructor(
    private authService: SocialAuthService,
     private router: Router
  ) {}

  redireccion() {
    console.log("redireccionando");
    this.router.navigate(['/crearEvento']);
  }

  redireccion2() {
    console.log("redireccionando");
    this.router.navigate(['/updEvento']);
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
