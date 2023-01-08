import {Ingredient} from "./ingredient";
import {Recipe} from "./recipe";


export interface DisplayedRecipeIngredient {
  [ingredientId: string] : Ingredient;
  // [recipeId: string] : Recipe;

  // ingredientCount: number;
  //
  // recipeId: string;
  //
  // ingredientName: string;
  // ingredientDescription: string;
  // ingredientUnit: string;

  // storeLocationId: string;
  // storeLocationName: string;
}


// export const RecipeIngredientColumns = [
//   {
//     key: 'isSelected',
//     type: 'isSelected',
//     label: '',
//   },
//   {
//     key: 'ingredientCount',
//     type: 'number',
//     label: 'Ingredient Count',
//     required: true,
//   },
//   {
//     key: 'ingredientName',
//     type: 'text',
//     label: 'Ingredient Name',
//     required: true,
//   },
//   {
//     key: 'ingredientUnit',
//     type: 'text',
//     label: 'Unit',
//     required: true,
//   },
//   {
//     key: 'ingredientDescription',
//     type: 'text',
//     label: 'Ingredient Description',
//   },
//   {
//     key: 'unit',
//     type: 'email',
//     label: 'Unit / Measurement Type',
//     required: true,
//   },
//   {
//     key: 'storeSectionId',
//     type: 'selector',
//     label: 'StoreSectionId',
//     required: true,
//   },
//   {
//     key: 'isEdit',
//     type: 'isEdit',
//     label: '',
//   },
// ];
