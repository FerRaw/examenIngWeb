import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  

  constructor(private http: HttpClient, private router: Router) { }

  verifyToken(idtoken: string): void {
    // Define your backend API URL
    const backendUrl = 'http://localhost:8000/logged';

    // Send a POST request to the backend with the idToken
    this.http.post(backendUrl, { idtoken: idtoken }).subscribe(
      (response) => {
        console.log('Token verification success:', response);
        localStorage.setItem("token", idtoken);
        this.router.navigate(['/inicio'])
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
  
}
