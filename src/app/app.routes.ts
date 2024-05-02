import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(c => c.RecipesListComponent) },
  { path: 'recipe/:id', loadComponent: () => import('./pages/recipe/recipe.component').then(c => c.RecipeComponent) }
];
