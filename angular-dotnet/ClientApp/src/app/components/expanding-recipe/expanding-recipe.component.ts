import {Component, Input} from '@angular/core';

import {Recipe} from "../../models/recipe";
import {IngredientFto, IngredientMap} from "../../models/ingredientFto";
import {RecipeIngredient} from "../../models/recipe-ingredient";
import {RecipeIngredientService} from "../../services/recipe-ingredient.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {RecipeDialog} from "../recipe-dialog/recipe-dialog.component";
import {RecipeService} from "../../services/recipe.service";

function ingredientMapToList(ingredientMap: IngredientMap) : IngredientFto[] {
  // NOTE THIS IS NEVER USED -
  let ingredients : IngredientFto[] = [{
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
function ingredientListToMap(ingredients: IngredientFto[]) : IngredientMap {
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
  get ingredients(): IngredientFto[] { return this._ingredients; }
  set ingredients(ingredients: IngredientFto[]) {
    this._ingredients = ingredients;

    let ingredientMap = ingredientListToMap(ingredients);
    console.log('ingredientMap',ingredientMap);
    this._ingredientMap = ingredientMap;
  }

  _ingredients!: IngredientFto[];
  _ingredientMap!: IngredientMap;

  constructor(private recipeService: RecipeService,
              private recipeIngredientService: RecipeIngredientService,
              public dialog: MatDialog) {}
  ngOnInit() {
  }

  openRecipeDialog(recipe: Recipe):void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: recipe.id,
      name: recipe.name,
      url: recipe.url
    };
    console.log('passing recipe to dialog:',dialogConfig);

    const dialogRef = this.dialog.open(RecipeDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((editedRecipe: Recipe) => {
      console.log(`Dialog result: ${editedRecipe}`);
      this.recipeService.addOrUpdate(editedRecipe).subscribe(() => {
        this.recipe = editedRecipe;
      });
    });
  }

  addRow() {
    console.log('expanding-recipe.component.ts addRow(')
    const newRecipeIngredient: RecipeIngredient = {
      recipeId: this.recipe.id,
      ingredientId: "00000000-0000-0000-0000-000000000000",
      ingredientCount: 0
    };
    this.recipeIngredients.push(newRecipeIngredient);
  }

  removeRow(ri: RecipeIngredient) {
    console.log('expanding-recipe.component.ts removeRow(',ri);
    this.recipeIngredientService.delete(ri.recipeId, ri.ingredientId).subscribe(() => {
      this.recipeIngredients = this.recipeIngredients.filter(
        (u: RecipeIngredient) => u.recipeId !== ri.recipeId && u.ingredientId !== ri.ingredientId
      );
    });
  }
  addOrUpdateRow(ri: RecipeIngredient) {
    console.log('expanding-recipe.component.ts updateCount(',ri);
    this.recipeIngredientService.addOrUpdate(ri).subscribe((response) => {
      console.log('addOrUpdateRow succeededed.... BUT WARNING WE DO NOT CHECK Response:',response);
    });
  }
}


/**  Copyright 2022 Google LLC. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at https://angular.io/license */
