import {Component, Input} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {Ingredient} from "../../models/ingredient";
import {RecipeIngredient} from "../../models/recipe-ingredient";
import {StoreSection} from "../../models/store-section";
import {DisplayedRecipeIngredient} from "../../models/displayed-recipe-ingredient";
import {IngredientMap} from "../../models/ingredient-map";

function ingredientMapToList(ingredientMap: IngredientMap) : Ingredient[] {
  // NOTE THIS IS NEVER USED -
  let ingredients : Ingredient[] = [{
    id: crypto.randomUUID(),
    name: "",
    description: "",
    unit: "",
    storeSectionId: "00000000-0000-0000-0000-000000000000",
    isEdit: true,
    isNew: true
  }];
  return ingredients;
}
function ingredientListToMap(ingredients: Ingredient[]) : IngredientMap {
  let ingredientMap: IngredientMap = {};
  for (let i of ingredients) {
    ingredientMap[i.id] = i;
  }
  return ingredientMap;
}
/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'expanding-recipe',
  templateUrl: 'expanding-recipe.component.html',
  styleUrls: ['expanding-recipe.component.css'],
})
export class ExpandingRecipe {
  panelOpenState = false;
  @Input() recipe!: Recipe;
  @Input()
  get recipeIngredients(): RecipeIngredient[] { return this._recipeIngredients; }
  set recipeIngredients(recipeIngredients: RecipeIngredient[]) {
    this._recipeIngredients = recipeIngredients.filter(ri => ri.recipeId === this.recipe.id);
    // for (let ri of tmp) {
    //   let ingredient = this.ingredients.find(i => i.id === ri.ingredientId);
    //   console.log('ingredient',ingredient);
    //   // @ts-ignore
    // }
  }
  _recipeIngredients!: RecipeIngredient[];

  @Input()
  get ingredients(): Ingredient[] { return ingredientMapToList(this._ingredientMap); }
  set ingredients(ingredients: Ingredient[]) {
    let ingredientMap = ingredientListToMap(ingredients);
    console.log('ingredientMap',ingredientMap);
    this._ingredientMap = ingredientMap;
  }
  _ingredientMap!: IngredientMap;

  // displayedRecipeIngredients: DisplayedRecipeIngredient[] = [];

  ngOnInit() {
    /* can't set displayedREcipeIngredients here because ti doesn't seem to capture them*/

  }



}


/**  Copyright 2022 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at https://angular.io/license */
