import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'menu-profe',
    loadChildren: () => import('./menu-profe/menu-profe.module').then( m => m.MenuProfePageModule)
  },
  {
    path: 'menu-alumno',
    loadChildren: () => import('./menu-alumno/menu-alumno.module').then( m => m.MenuAlumnoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
