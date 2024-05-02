import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesStore } from 'src/app/store/recipes-store';
import { IRecipe } from 'src/app/models/interfaces/recipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  // providers: [RecipesStore],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _store = inject(RecipesStore);
  recipe = computed<IRecipe | undefined>(() => this._store.recipes()
    .find(({ id }) => id == this._activatedRoute.snapshot.params['id']));
}
