import {Component, Input} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {Ingredient} from "../../models/ingredient";
import {RecipeIngredient} from "../../models/recipe-ingredient";
import {StoreSection} from "../../models/store-section";
import {DisplayedRecipeIngredient} from "../../models/displayed-recipe-ingredient";

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
    let tmp = recipeIngredients.filter(ri => ri.recipeId === this.recipe.id);
    console.log('tmp',tmp);
    for (let ri of tmp) {
      let ingredient = this.ingredients.find(i => i.id === ri.ingredientId);
      console.log('ingredient',ingredient);
      // @ts-ignore
      let newRi: DisplayedRecipeIngredient = {
        recipeId: this.recipe.id,
        ingredientCount: ri.ingredientCount,
        ingredientId: ri.ingredientId,
        ingredientName: ingredient?.name ?? "",
        ingredientUnit: ingredient?.unit ?? "",
        ingredientDescription: ingredient?.description ?? ""
      };
      this.displayedRecipeIngredients.push(newRi);
    }
    console.log('displayedRecipeIngredients',this.displayedRecipeIngredients);
  }
  private _recipeIngredients!: RecipeIngredient[];

  @Input() ingredients!: Ingredient[];

  displayedRecipeIngredients: DisplayedRecipeIngredient[] = [];

  ngOnInit() {
    /* can't set displayedREcipeIngredients here because ti doesn't seem to capture them*/
  }

}


/**  Copyright 2022 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at https://angular.io/license */
