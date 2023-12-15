import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class OauthService {
  

  constructor(private http: HttpClient, private router: Router) { }

  verifyToken(user: SocialUser): void {
    // Define your backend API URL
    const backendUrl = 'http://localhost:8000/logged';

    // Send a POST request to the backend with the idToken
    this.http.post(backendUrl, { idtoken: user.idToken }).subscribe(
      (response) => {
        console.log(response)
        console.log('Token verification success:', response);
        localStorage.setItem("token", user.idToken);
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("photoUrl", user.photoUrl);
        location.reload();
      },
      (error) => {
        console.error('Token verification error:', error);
        // Handle the verification error as needed
      }
    );
  }

  getEventos(): Observable<any> {
    return this.http.get('http://localhost:8000/eventos/');
    //return this.http.get<any>(url);
  }

  getCoordenadas(cadena: string): Observable<any> {
    const url = `http://localhost:8000/form/${cadena}/`;
    return this.http.get<any>(url);
  }
  createEvento(producto: any): Observable<any> {
    const url = `http://localhost:8000/eventos/create/`;
    ///const url = `http://172.31.26.175:8000/evento/create/`;
    return this.http.post<any>(url, producto);
  }  

  uploadImage(files: File[]): Observable<any> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    return this.http.post<any>('http://localhost:8000/image/upload', formData);
  
  }
  
}
