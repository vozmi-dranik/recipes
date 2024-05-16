import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IRecipe } from 'src/app/models/interfaces/recipe';
import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';

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
  withMethods((store, recipesService = inject(RecipesService)) => ({
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
    )
  }))
);
