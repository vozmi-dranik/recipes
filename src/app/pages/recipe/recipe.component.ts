import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesStore } from 'src/app/store/recipes-store';
import { IRecipe, IStep } from 'src/app/models/interfaces/recipe';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddStepModalComponent } from 'src/app/components/modals/add-step-modal/add-step-modal.component';
import { filter } from 'rxjs';
import { CurrentRecipeStore } from 'src/app/store/current-recipe.store';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    MatButton
  ],
  providers: [CurrentRecipeStore],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit {
  private readonly _store = inject(CurrentRecipeStore);
  private readonly _activatedRoute = inject(ActivatedRoute);
  readonly recipe = this._store.recipe;
  readonly dialog = inject(MatDialog);

  addStep() {
    this.dialog.open(AddStepModalComponent).afterClosed()
      .pipe(filter(arg => !!arg))
      // todo: connect with the backend and add the interface
      .subscribe((step: IStep) => {
        this.recipe()?.steps.push(step);
      });
  }

  ngOnInit(): void {
    this._store.loadRecipe(this._activatedRoute.snapshot.params['id']);
  }
}
