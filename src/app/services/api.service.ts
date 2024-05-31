import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AllRecipesGQL, AllRecipesQuery, RecipeGQL, RecipeQuery } from 'graphql/generated';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allRecipesGQL = inject(AllRecipesGQL);
  private readonly _recipeGQL = inject(RecipeGQL);

  getAllRecipes(): Observable<AllRecipesQuery['recipes']> {
    return this._allRecipesGQL.watch().valueChanges.pipe(
      map(({ data }) => data.recipes)
    );
  }

  getRecipe(id: string): Observable<RecipeQuery['recipe']> {
    return this._recipeGQL.watch({ id }).valueChanges.pipe(
      map(({ data }) => data.recipe)
    );
  }
}
