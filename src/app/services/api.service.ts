import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client';
import { IRecipe } from 'src/app/models/interfaces/recipe';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apolloProvider =  inject(Apollo);
  // apollo = this.apolloProvider.use('newClientName');


  constructor(private readonly apollo: Apollo) {}

  getAllRecipes(): Observable<IRecipe[]> {
    return this.apollo.watchQuery<{ recipes: IRecipe[] }>({
      query: gql`
        query {
          recipes {
            id
            name
            description
            ingredients {
              id
              name
            }
            steps {
              id
            }
          }
        }
      `,
    }).valueChanges.pipe(
      map(({ data }) => data.recipes));
  }
}
