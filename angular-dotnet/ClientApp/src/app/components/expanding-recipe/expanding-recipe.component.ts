import {Component, Input} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {Ingredient} from "../../models/ingredient";
import {RecipeIngredient} from "../../models/recipe-ingredient";
import {StoreSection} from "../../models/store-section";

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
  @Input() recipeIngredients!: RecipeIngredient[];
  @Input() Ingredients!: Ingredient[];
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at https://angular.io/license */
