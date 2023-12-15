import { Routes } from '@angular/router';
import { InicioComponent } from './features/inicio/inicio.component';
import { MapComponent } from './features/map/map.component';
import { OauthComponent } from './features/oauth/oauth.component';
import { InicioEmtComponent } from './features/inicio-emt/inicio-emt.component';
import { InicioVentasComponent } from './features/inicio-ventas/inicio-ventas.component';
import { PujarComponent } from './features/pujar/pujar.component';
import { CrearProductoComponent } from './features/crear-producto/crear-producto.component';

export const routes: Routes = [
    {
        path: 'login',
        component: OauthComponent,
        title: 'Iniciar sesión'
    },
    {
        path: 'inicio',
        component: InicioComponent,
        title: 'Inicio'
    },
    {
        path: 'map',
        component: MapComponent,
        title: 'Mapa'
    },
    {
        path: 'inicioEmt',
        component: InicioEmtComponent,
        title: 'Inicio EMT'
    },
    {
        path: 'articulos',
        component: InicioVentasComponent,
        title: 'Venta Articulos'
    },
    {
        path: 'articulo/:id',
        component: PujarComponent,
        title: 'Puja Articulo'
    },
    {
        path: 'crearProducto',
        component: CrearProductoComponent,
        title: 'Crear Producto'   
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
];
