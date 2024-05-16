import { Component, computed, input } from '@angular/core';
import { IRecipe } from 'src/app/models/interfaces/recipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  recipe = input.required<IRecipe>()
  recipeLink = computed<string>(() => `/recipe/${this.recipe().id}`);
}
