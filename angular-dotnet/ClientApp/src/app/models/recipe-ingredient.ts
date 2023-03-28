import {Recipe} from "./recipe";
import {Ingredient} from "./ingredientFto";

export interface RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  ingredientCount: number;
}

// export interface RecipeIngredientFto extends RecipeIngredient, Recipe, Ingredient {
//
// }
