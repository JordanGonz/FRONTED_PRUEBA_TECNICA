import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'registro-cargos',
    loadComponent: async () =>
    (await import('./registro-cargos/registro-cargos.component')).RegistroCargosComponent,
  },
  {
    path: '**',
    redirectTo: 'registro-cargos',
  }
];
