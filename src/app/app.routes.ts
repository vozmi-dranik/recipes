import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(c => c.RecipesListComponent) }
];
