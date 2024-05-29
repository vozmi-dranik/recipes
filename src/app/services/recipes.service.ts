import { inject, Injectable } from '@angular/core';
import { filter, map, of } from 'rxjs';
import { RecipesMock } from 'src/app/models/mock/recipes.mock';
import { ApiService } from 'src/app/services/api.service';
import { IRecipe } from 'src/app/models/interfaces/recipe';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private readonly _apiService = inject(ApiService);
  getByQuery(query: string = '') {
    return this._apiService.getAllRecipes().pipe(
      map((recipes: IRecipe[]) => recipes.filter(({ name }) => name.includes(query))),
    );
    // return of(RecipesMock.filter(({ name }) => name.includes(query)));
  }
}
