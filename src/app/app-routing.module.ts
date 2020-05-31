import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component'
import { MenuComponent } from './menu/menu.component';
import { CampanasComponent } from './campanas/campanas.component';
import { CentrosComponent } from './centros/centros.component';
import { PaginaEnviarComponent } from './pagina-enviar/pagina-enviar.component';
import { TopComponent} from './top/top.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component:InicioComponent},
  { path: 'menu',component: MenuComponent},
  { path: 'campañas', component: CampanasComponent},
  { path: 'centros', component: CentrosComponent},
  { path: 'envíos', component:PaginaEnviarComponent},
  { path: 'top', component:TopComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'about', component: AboutComponent}
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
