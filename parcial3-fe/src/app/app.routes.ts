import { Routes } from '@angular/router';
import { OauthComponent } from './features/oauth/oauth.component';
import { CrearProductoComponent } from './features/crear-producto/crear-producto.component';
import { EventosComponent } from './features/eventos/eventos.component';
import { UpdEventoComponent } from './features/upd-evento/upd-evento.component';

export const routes: Routes = [
    
    {
        path: 'login',
        component: OauthComponent,
        title: 'Iniciar sesión'
    },
    {
        path: 'eventos',
        component: EventosComponent,
        title: 'Eventos'
    },
    {
        path: 'crearEvento',
        component: CrearProductoComponent,
        title: 'Crear Evento'
    },
    {
        path: 'updEvento',
        component: UpdEventoComponent,
        title: 'Actualiza Articulo'
    },
    
];
