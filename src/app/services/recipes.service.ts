import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RecipesMock } from 'src/app/models/mock/recipes.mock';

@Injectable({providedIn: 'root'})
export class RecipesService {
  getByQuery(query: string = '') {
    return of(RecipesMock.filter(({ name }) => name.includes(query)));
  }
}
