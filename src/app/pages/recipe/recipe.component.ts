import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IStep } from 'src/app/models/interfaces/recipe';
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
      .subscribe((step: IStep) => {
        const recipe = this.recipe()!;
        recipe.steps = [...recipe.steps, step];
        this._store.updateRecipe(recipe);
      });
  }

  ngOnInit(): void {
    this._store.loadRecipe(this._activatedRoute.snapshot.params['id']);
  }
}
