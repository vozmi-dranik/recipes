import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IngredientInput, Recipe, RecipeInput, StepInput } from 'graphql/generated';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private readonly _apiService = inject(ApiService);

  getByQuery(query: string = ''): Observable<Recipe[]> {
    return this._apiService.getAllRecipes().pipe(
      map((recipes) => recipes.filter((recipe) => recipe?.name.includes(query))),
    ) as Observable<Recipe[]>;
  }

  getRecipeById(id: string) {
    return this._apiService.getRecipe(id);
  }

  addRecipe(recipeInputData: RecipeInput) {
    return this._apiService.addRecipe(recipeInputData);
  }

  removeRecipe(recipeId: string) {
    return this._apiService.removeRecipe(recipeId);
  }

  addStep(recipeId: string, step: StepInput) {
    return this._apiService.addStep(recipeId, step);
  }

  addIngredient(recipeId: string, ingredient: IngredientInput) {
    return this._apiService.addIngredient(recipeId, ingredient);
  }
}
