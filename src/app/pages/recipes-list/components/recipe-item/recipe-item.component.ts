import { Component, input } from '@angular/core';
import { IRecipe } from 'src/app/models/interfaces/recipe';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  recipe = input.required<IRecipe>()
}
