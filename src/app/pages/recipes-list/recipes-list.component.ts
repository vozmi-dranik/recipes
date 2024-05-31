import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RecipeItemComponent } from 'src/app/pages/recipes-list/components/recipe-item/recipe-item.component';
import { AsyncPipe } from '@angular/common';
import { RecipesStore } from 'src/app/store/recipes-store';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { AddRecipeModalComponent } from 'src/app/components/modals/add-recipe-modal/add-recipe-modal.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    AsyncPipe,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  // todo: uncomment and use store only for this component when backend is ready
  // providers: [RecipesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {
  private readonly _store = inject(RecipesStore);
  private readonly dialog = inject(MatDialog);
  readonly recipes = this._store.recipes;

  findRecipe(value: string) {
    this._store.updateQuery(value);
  }

  addRecipe() {
    this.dialog.open(AddRecipeModalComponent).afterClosed()
      .pipe(filter(arg => !!arg))
      .subscribe((recipeInputData: { name: string, description: string }) => {
        this._store.addRecipe(recipeInputData);
      });
  }

  ngOnInit(): void {
    const query = this._store.filter.query;
    this._store.loadByQuery(query);
  }
}
