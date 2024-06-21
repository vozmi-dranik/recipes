import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  AddIngredientGQL,
  AddStepGQL,
  AllRecipesGQL,
  AllRecipesQuery,
  CreateRecipeGQL,
  DeleteRecipeGQL, IngredientInput,
  RecipeGQL, RecipeInput,
  RecipeQuery,
  Step,
  StepInput
} from 'graphql/generated';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allRecipesGQL = inject(AllRecipesGQL);
  private readonly _recipeGQL = inject(RecipeGQL);
  private readonly _createRecipeGQL = inject(CreateRecipeGQL);
  private readonly _deleteRecipeGQL = inject(DeleteRecipeGQL);
  private readonly _addStepGQL = inject(AddStepGQL);
  private readonly _addIngredientGQL = inject(AddIngredientGQL);

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

  addRecipe(recipeInputData: RecipeInput) {
    return this._createRecipeGQL.mutate({ recipeData: recipeInputData }).pipe(
      tap(({ data }) => console.log(data)),
      map(({ data }) => data?.createRecipe),
    )
  }

  removeRecipe(recipeId: string) {
    return this._deleteRecipeGQL.mutate({ id: recipeId }).pipe(
      tap(({ data }) => console.log(data)),
      map(({ data }) => data?.deleteRecipe),
    )
  }

  addStep(recipeId: string, stepData: StepInput) {
    return this._addStepGQL.mutate({ recipeId, stepData }).pipe(
      tap(({ data }) => console.log(data)),
      map(({ data }) => data?.addStep),
    )
  }

  addIngredient(recipeId: string, ingredientData: IngredientInput) {
    return this._addIngredientGQL.mutate({ recipeId, ingredientData }).pipe(
      tap(({ data }) => console.log(data)),
      map(({ data }) => data?.addIngredient),
    )
  }
}
