import { Component } from '@angular/core';
import { RecipeItemComponent } from 'src/app/pages/recipes-list/components/recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {

}
