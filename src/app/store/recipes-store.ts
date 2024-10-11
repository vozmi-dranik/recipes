import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  pipe,
  switchMap,
  tap
} from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { Recipe, RecipeInput } from 'graphql/generated';

type RecipesState = {
  recipes: Recipe[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: RecipesState = {
  recipes: [],
  isLoading: true,
  filter: { query: '', order: 'asc' },
};

export const RecipesStore = signalStore(
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
              next: (recipes: Recipe[]) => patchState(store, { recipes, isLoading: false }),
              error: (error) => {console.error(error); patchState(store, { isLoading: false })},
            }),
          );
        })
      )
    ),
    addRecipe: rxMethod<RecipeInput>(
      pipe(
        switchMap((recipeInputData) => {
          return recipesService.addRecipe(recipeInputData).pipe(
            tapResponse({
              next: (recipe) => {
                if (recipe) {
                  patchState(store, (state) => ({
                    recipes: [
                      ...state.recipes,
                      recipe
                    ],
                  }));
                } else {
                  throw new Error('Recipe not added');
                }
                router.navigate(['/recipe', recipe?.id]);
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),

    removeRecipe: rxMethod<string>(
      pipe(
        switchMap((recipeId) => {
          return recipesService.removeRecipe(recipeId).pipe(
            tapResponse({
              next: () => {
                patchState(store, (state) => ({
                  recipes: [
                    ...state.recipes.filter((recipe) => recipe.id !== recipeId)
                  ],
                }));
              },
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    )
  })),
);
