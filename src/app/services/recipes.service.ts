import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IRecipe } from 'src/app/models/interfaces/recipe';

@Injectable({providedIn: 'root'})
export class RecipesService {
  private readonly _apiService = inject(ApiService);
  getByQuery(query: string = '') {
    return this._apiService.getAllRecipes().pipe(
    // @ts-ignore
      map((recipes: IRecipe[]) => recipes.filter(({ name }) => name.includes(query))),
    );
    // return of(RecipesMock.filter(({ name }) => name.includes(query)));
  }

  getRecipeById(id: string) {
    return this._apiService.getRecipe(id);
  }

  addRecipe(recipeInputData: { name: string, description: string }) {
    return this._apiService.addRecipe(recipeInputData);
  }

  removeRecipe(recipeId: string | number) {
    return this._apiService.removeRecipe(recipeId);
  }
}
