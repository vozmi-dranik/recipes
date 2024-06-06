import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AllRecipesGQL, AllRecipesQuery } from 'graphql/generated';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allRecipesGQL = inject(AllRecipesGQL);

  getAllRecipes(): Observable<AllRecipesQuery['recipes']> {
    return this._allRecipesGQL.watch().valueChanges.pipe(
      map(({ data }) => data.recipes)
    );
  }
}
