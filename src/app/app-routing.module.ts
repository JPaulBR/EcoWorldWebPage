import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InicioComponent} from './inicio/inicio.component'
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'menu',component: MenuComponent}
  //{ path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
