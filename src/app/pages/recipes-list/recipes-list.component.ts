import { Component } from '@angular/core';
import { RecipeItemComponent } from 'src/app/pages/recipes-list/components/recipe-item/recipe-item.component';
import { of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RecipesMock } from 'src/app/models/mock/recipes.mock';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    AsyncPipe,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  recipes$ = of(RecipesMock);
}
