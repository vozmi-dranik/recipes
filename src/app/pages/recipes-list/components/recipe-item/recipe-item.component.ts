import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { IRecipe } from 'src/app/models/interfaces/recipe';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Output() recipeForDeleteId = new EventEmitter<string | number>();
  recipe = input.required<IRecipe>();
  recipeLink = computed<string>(() => `/recipe/${ this.recipe().id }`);

  openDeleteRecipeModal() {
    this.recipeForDeleteId.emit(this.recipe().id);
  }
}
