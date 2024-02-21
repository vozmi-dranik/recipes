import { IRecipe } from 'src/app/models/interfaces/recipe';

export const RecipesMock: IRecipe[] = [
  { id: 1, name: 'first', ingredients: [{ name: 'sugar', count: 100, measure: 'g', }], steps: [{description: 'Make smth'}] },
  { id: 2, name: 'second', ingredients: [{ name: 'milk', count: 200, measure: 'ml', }], steps: [{description: 'Make smth else'}] },
  { id: 3, name: 'third', ingredients: [{ name: 'lemon', count: 1, measure: 'pcs', }], steps: [{description: 'Make totally smth else'}] },
  { id: 4, name: 'fourth', ingredients: [
    { name: 'lemon', count: 1, measure: 'pcs', },
      { name: 'water', count: 100, measure: 'ml', }
    ],
    steps: [
    {description: 'Make totally smth else'},
      {description: 'Make totally smth else'}
    ] },
];


