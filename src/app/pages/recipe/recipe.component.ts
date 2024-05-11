import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesStore } from 'src/app/store/recipes-store';
import { IRecipe } from 'src/app/models/interfaces/recipe';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddStepModalComponent } from 'src/app/components/modals/add-step-modal/add-step-modal.component';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    MatButton
  ],
  // providers: [RecipesStore],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  dialog = inject(MatDialog);

  private _activatedRoute = inject(ActivatedRoute);
  private _store = inject(RecipesStore);
  recipe = computed<IRecipe | undefined>(() => this._store.recipes()
    .find(({ id }) => id == this._activatedRoute.snapshot.params['id']));

  addStep() {
    this.dialog.open(AddStepModalComponent);
  }


}
