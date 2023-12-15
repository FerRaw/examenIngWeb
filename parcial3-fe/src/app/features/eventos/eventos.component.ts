import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OauthService } from '../../services/oauth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
  providers: [OauthService]
})
export class EventosComponent {
  lat: number = 36.718518;
  lon: number = -4.444201;
  location: any = {};
  eventos : any[] = [];
  eventosMarcados : any[] = [];
  cadenaDireccion: any;
  sentidoSeleccionado: any;
  palabra: any;
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor(
      private servicioPpal: OauthService,
      private http: HttpClient,
  ){}

  ngOnInit(): void {
    console.log(localStorage.getItem("token"), localStorage.getItem("email"));
    this.servicioPpal.getEventos().subscribe((data: any[]) => {
      this.eventos = data;
    });
    this.initMapInicio({ latitude: this.lat, longitude: this.lon });
  }

  private initMapInicio(location: { latitude: number; longitude: number }): void {
    this.map = L.map('map').setView([location.latitude, location.longitude], 35);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 13,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
  }

  public initMap(location: { latitude: number; longitude: number }): void {
    const marker = L.marker([location.latitude, location.longitude]).addTo(this.map).openPopup();
    this.markers.push(marker);
  }

  //Enviar formulario con un sitio y devuelve los eventos cuyas coordenadas estan a menos de 0.2 unidades de distancia
  enviarFormulario(): void {
    this.servicioPpal.getCoordenadas(this.palabra).subscribe((data: any[]) => {
      this.location = data;
      this.eventosMarcados = this.eventos.filter(evento => {
        const latDiff = Math.abs(evento.lat - this.location.latitud);
        return latDiff < 0.2;
      });
      console.log(this.eventosMarcados);
      this.initMap({ latitude: this.location.latitud, longitude: this.location.longitud });
      this.servicioPpal.getEventos().subscribe((data: any[]) => {
        this.eventos = data;
        for (let i = 0; i < this.eventosMarcados.length; i++) {
          console.log(this.eventosMarcados[i].lat, this.eventosMarcados[i].lon);
          this.initMap({ latitude: this.eventos[i].lat, longitude: this.eventos[i].lon });
        }
      });
    });
  }

  eliminarMarcadores(): void {
    this.markers.forEach(marker => {
      this.map.removeLayer(marker);
    });  
    // Limpia el array de marcadores
    this.markers = [];
  }


  anyadirMarcadores(data: any[]): void {
    for (let i = 0; i < data.length; i++) {
      let num1 = data[i][0];
      let num2 = data[i][1];
      this.markers.push(L.marker([num1, num2]).addTo(this.map).openPopup());

      // Agrega un marcador al mapa para cada par de coordenadas
      if (L) {
        this.initMap({ latitude: num1, longitude: num2 });
        
      }
    }
  }

  onPalabraChange(event: any) {
    this.palabra = event.target.value;
  }

}
