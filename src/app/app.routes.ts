import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'recipe-details/:id',
    loadComponent: () =>
      import('./recipe-details/recipe-details.page').then(m => m.RecipeDetailsPage),
  },
];
