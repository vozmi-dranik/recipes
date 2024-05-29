export interface IRecipe {
  id: number | string;
  name: string;
  description: string;
  ingredients: IIngredient[];
  steps: IStep[];
}

export interface IIngredient {
  name: string;
  count: number;
  // todo: mb set g/mg/teaspoon/ml etc
  measure: string;
}

export interface IStep {
  description: string;
  title?: string;
  image?: string;
}
