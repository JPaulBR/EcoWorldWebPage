import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component'
import { MenuComponent } from './menu/menu.component';
import { CampanasComponent } from './campanas/campanas.component';
import { CentrosComponent } from './centros/centros.component';
import { PaginaEnviarComponent } from './pagina-enviar/pagina-enviar.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'menu',component: MenuComponent},
  { path: 'campañas', component: CampanasComponent},
  { path: 'centros', component: CentrosComponent},
  { path: 'envíos', component:PaginaEnviarComponent}
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
