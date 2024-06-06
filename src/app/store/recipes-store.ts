import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IRecipe } from 'src/app/models/interfaces/recipe';
import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

type RecipesState = {
  recipes: IRecipe[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: RecipesState = {
  recipes: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const RecipesStore = signalStore(
  // todo: remove when bakend is ready
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ recipes, filter }) => ({
    recipesCount: computed(() => recipes().length),
    sortedRecipes: computed(() => {
      const direction = filter.order() === 'asc' ? 1 : -1;

      return [...recipes()].sort((a, b) =>
        direction * a.name.localeCompare(b.name)
      );
    }),
  })),
  withMethods((store, recipesService = inject(RecipesService), router = inject(Router)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
    loadByQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((query) => {
          return recipesService.getByQuery(query).pipe(
            tapResponse({
              next: (recipes) => patchState(store, { recipes }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    addRecipe: rxMethod<{ name: string, description: string }>(
      pipe(
        switchMap((recipeInputData) => {
          return recipesService.addRecipe(recipeInputData).pipe(
            tapResponse({
              next: (recipe) => {
                patchState(store, (state) => ({
                  recipes: [
                    ...state.recipes,
                    { id: recipe?.id || 0, name: recipe?.name || '', description: recipe?.description ?? '', ingredients: [], steps: [] }
                  ],
                }))
                router.navigate(['/recipe', recipe?.id]);
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),

    removeRecipe: rxMethod<string | number>(
      pipe(
        switchMap((recipeId) => {
          return recipesService.removeRecipe(recipeId).pipe(
            tapResponse({
              next: () => {
                patchState(store, (state) => ({
                  recipes: [
                    ...state.recipes.filter((recipe) => recipe.id !== recipeId)
                  ],
                }))
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    )
  }))
);
