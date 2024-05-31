import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ingredient = {
  __typename?: 'Ingredient';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  measure: Scalars['String']['output'];
  name: Scalars['String']['output'];
  recipeId?: Maybe<Scalars['ID']['output']>;
};

export type IngredientInput = {
  count: Scalars['Int']['input'];
  measure: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecipe?: Maybe<Recipe>;
};


export type MutationCreateRecipeArgs = {
  recipeData?: InputMaybe<RecipeInput>;
};

export type Query = {
  __typename?: 'Query';
  recipe?: Maybe<Recipe>;
  recipes: Array<Maybe<Recipe>>;
};


export type QueryRecipeArgs = {
  id: Scalars['ID']['input'];
};

export type Recipe = {
  __typename?: 'Recipe';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ingredients?: Maybe<Array<Maybe<Ingredient>>>;
  name: Scalars['String']['output'];
  steps?: Maybe<Array<Maybe<Step>>>;
};

export type RecipeInput = {
  description: Scalars['String']['input'];
  ingredients?: InputMaybe<Array<InputMaybe<IngredientInput>>>;
  name: Scalars['String']['input'];
  steps?: InputMaybe<Array<InputMaybe<StepInput>>>;
};

export type Step = {
  __typename?: 'Step';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  recipeId?: Maybe<Scalars['ID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type StepInput = {
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AllRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', id: string, name: string, description: string } | null> };

export type RecipeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe?: { __typename?: 'Recipe', id: string, name: string, description: string, ingredients?: Array<{ __typename?: 'Ingredient', id: string, name: string, count: number, measure: string } | null> | null, steps?: Array<{ __typename?: 'Step', id: string, description: string, title?: string | null, image?: string | null } | null> | null } | null };

export type CreateRecipeMutationVariables = Exact<{
  recipeData: RecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe?: { __typename?: 'Recipe', id: string, name: string, description: string } | null };

export const AllRecipesDocument = gql`
    query allRecipes {
  recipes {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllRecipesGQL extends Apollo.Query<AllRecipesQuery, AllRecipesQueryVariables> {
    document = AllRecipesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RecipeDocument = gql`
    query recipe($id: ID!) {
  recipe(id: $id) {
    id
    name
    description
    ingredients {
      id
      name
      count
      measure
    }
    steps {
      id
      description
      title
      image
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RecipeGQL extends Apollo.Query<RecipeQuery, RecipeQueryVariables> {
    document = RecipeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRecipeDocument = gql`
    mutation CreateRecipe($recipeData: RecipeInput!) {
  createRecipe(recipeData: $recipeData) {
    id
    name
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateRecipeGQL extends Apollo.Mutation<CreateRecipeMutation, CreateRecipeMutationVariables> {
    document = CreateRecipeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }