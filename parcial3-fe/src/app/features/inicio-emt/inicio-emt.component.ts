import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OauthService } from '../../services/oauth.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-inicio-emt',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './inicio-emt.component.html',
  styleUrl: './inicio-emt.component.css',
  providers: [OauthService]
})
export class InicioEmtComponent {
  
  lat: number = 36.718518;
  lon: number = -4.444201;
  location = {latitude: 0, longitude: 0};
  lineas : any[] = [];  // Añade o cambia los números de línea según sea necesario
  lineaSeleccionada: any;
  sentidoSeleccionado: any;
  palabra: any;
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor(
      private servicioPpal: OauthService,
        private http: HttpClient,
  ){}

  ngOnInit(): void {
    this.servicioPpal.getLineas().subscribe((data: any[]) => {
      console.log(data);
      this.lineas = data;
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

  enviarFormulario(): void {
    // Elimina todos los marcadores existentes del mapa
    this.eliminarMarcadores();
  
    console.log(this.lineaSeleccionada, this.sentidoSeleccionado);
    if (this.lineaSeleccionada != '' && this.sentidoSeleccionado != '') {
      if (this.sentidoSeleccionado === 'Ida') {
        this.sentidoSeleccionado = '1';
      } else {
        this.sentidoSeleccionado = '2';
      }
      console.log(this.lineaSeleccionada, this.sentidoSeleccionado);
      this.servicioPpal.getForm1(this.lineaSeleccionada, this.sentidoSeleccionado).subscribe((data: any[]) => {
        console.log(data);
        this.anyadirMarcadores(data);
      });
    }
  }

  form2(): void {
    this.eliminarMarcadores();
    console.log(this.palabra);
    if (this.palabra != '') {
      this.servicioPpal.getForm2(this.palabra).subscribe((data: any[]) => {
        console.log(data);
        this.anyadirMarcadores(data);
      });
    }
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

  onLineaChange(event: any) {
    this.lineaSeleccionada = event.target.value;
  }
  
  onSentidoChange(event: any) {
    this.sentidoSeleccionado = event.target.value;
  }

  onPalabraChange(event: any) {
    this.palabra = event.target.value;
  }
}
