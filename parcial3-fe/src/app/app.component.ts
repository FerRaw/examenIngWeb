import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/navbar/navbar.component';
import { OauthComponent } from './features/oauth/oauth.component';
import { HttpClientModule } from '@angular/common/http';
import { OauthService } from './services/oauth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [OauthService]
})
export class AppComponent {
  title = 'parcial3';
  loggedIn : any;
  token = localStorage.getItem("token");

  ngOnInit(): void {

    if(this.token!=null && this.token!=undefined){
      this.loggedIn = true;
    }
  }
}
