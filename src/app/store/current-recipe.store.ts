import { IRecipe } from 'src/app/models/interfaces/recipe';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type CurrentRecipeState = {
  recipe: IRecipe | null;
  isLoading: boolean;
};

const initialState: CurrentRecipeState = {
  recipe: null,
  isLoading: false,
};


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
              //     todo: change interfaces with the data from graphql types
              // @ts-ignore
              next: (recipe) => patchState(store, { recipe }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            })
          );
        })
      )
    ),
    // @ts-ignore
    updateRecipe: rxMethod<IRecipe>(
      tap((recipe) => patchState(store, { recipe })),
      // todo: uncomment when backend is ready
      // tap((recipe) => patchState(store, { isLoading: true })),
      // switchMap((data: IRecipe) => {
      //   return recipesService.updateRecipe(id).pipe(
      //     tapResponse({
      //       next: (recipe) => patchState(store, { recipe }),
      //       error: console.error,
      //       finalize: () => patchState(store, { isLoading: false }),
      //     })
      //   );
      // })
    )
  }))
);
