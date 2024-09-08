import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/recipes-list/recipes-list.component').then(c => c.RecipesListComponent) },
  { path: 'recipe/:id', loadComponent: () => import('./pages/recipe/recipe.component').then(c => c.RecipeComponent) },
  { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(c => c.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./pages/auth/signup/signup.component').then(c => c.SignupComponent) },
];
