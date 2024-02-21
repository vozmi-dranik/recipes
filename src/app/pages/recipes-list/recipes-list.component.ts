import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RecipeItemComponent } from 'src/app/pages/recipes-list/components/recipe-item/recipe-item.component';
import { AsyncPipe } from '@angular/common';
import { RecipesStore } from 'src/app/store/recipes-store';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    AsyncPipe,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
  providers: [RecipesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {
  private readonly _store = inject(RecipesStore);
  readonly recipes = this._store.recipes;

  findRecipe(value: string) {
    this._store.updateQuery(value);
  }

  ngOnInit(): void {
    const query = this._store.filter.query;
    this._store.loadByQuery(query);
  }
}
