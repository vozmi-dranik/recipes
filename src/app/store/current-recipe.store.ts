import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, pipe, skipUntil, skipWhile, switchMap, tap, withLatestFrom } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { IngredientInput, Recipe, StepInput } from 'graphql/generated';

type CurrentRecipeState = {
  recipe: Recipe | null;
  isLoading: boolean;
};

const initialState: CurrentRecipeState = {
  recipe: null,
  isLoading: false,
};


// @ts-ignore
export const CurrentRecipeStore = signalStore(
  withState<CurrentRecipeState>(initialState),
  withMethods((store, recipesService = inject(RecipesService)) => ({
    loadRecipe: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return recipesService.getRecipeById(id).pipe(
            tapResponse({
              next: (recipe) => patchState(store, { recipe }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    addStep: rxMethod<StepInput>(
      switchMap((step) => {
        patchState(store, { isLoading: true });
        return recipesService.addStep(store.recipe()?.id as string, step).pipe(
          tapResponse({
            next: (recipe) => patchState(store, { recipe }),
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      })
    ),
    addIngredient: rxMethod<IngredientInput>(
      switchMap((ingredient) => {
        patchState(store, { isLoading: true });
        return recipesService.addIngredient(store.recipe()?.id as string, ingredient).pipe(
          tapResponse({
            next: (recipe) => patchState(store, { recipe }),
            error: console.error,
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      })
    )
  }))
);
