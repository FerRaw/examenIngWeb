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

  getLineas(): Observable<any> {
    return this.http.get('http://localhost:8000/lineas/');
    //return this.http.get<any>(url);
  }

  getForm1(codLinea: string, sentido: string): Observable<any> {
    const url = `http://localhost:8000/lineas/${codLinea}/${sentido}/`;
    console.log(this.http.get<any>(url));
    return this.http.get<any>(url);
  }

  getForm2(parada: string): Observable<any> {
    const url = `http://localhost:8000/paradas/${parada}/`;
    console.log(this.http.get<any>(url));
    return this.http.get<any>(url);
  }

  getProductos(): Observable<any> {
    return this.http.get('http://localhost:8000/articulos/');
  }

  getProducto(id: string): Observable<any> {
    const url = `http://localhost:8000/articulo/${id}/`;
    return this.http.get<any>(url);
  }

  getUltimaPuja(id: string): Observable<any> {
    const url = `http://localhost:8000/pujas/last/${id}/`;
    return this.http.get<any>(url);
  }

  getPujas(id: string): Observable<any> {
    const url = `http://localhost:8000/pujas/producto/${id}/`;
    return this.http.get<any>(url);
  }

  crearPuja(puja: any): Observable<any> {
    const url = `http://localhost/pujas/create/`;
    return this.http.post<any>(url, puja);
  }

  createProducto(producto: any): Observable<any> {
    const url = `http://172.31.26.175:8000/articulos/create/`;
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
