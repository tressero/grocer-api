import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../../services/recipe.service";
import {Recipe, RecipeFto} from "../../models/recipe";
import {IngredientService} from "../../services/ingredient.service";
import {RecipeIngredient} from "../../models/recipe-ingredient";
import {
  Ingredient,
  IngredientWithQuantity,
  IngredientWithQuantityAndUses,
  IngredientWithQuantityByStoreLocationId
} from "../../models/ingredientFto";

@Component({
  selector: 'app-ox-recipe-selector',
  templateUrl: './ox-recipe-selector.component.html',
  styleUrls: ['./ox-recipe-selector.component.css']
})
export class OxRecipeSelectorComponent implements OnInit {


  // public recipesChecked: Recipe_Checked[] = [];
  constructor(public recipeService: RecipeService,
              public ingredientService: IngredientService) {}

  /* Typeguard below: https://www.typescriptlang.org/docs/handbook/advanced-types.html */

  // function isIngredient(pet: Ingredient): pet is Ingredient {
  //   return (pet as Ingredient).id !== undefined;
  // }

  public ingredientWithQuantityByStoreLocationId : IngredientWithQuantityByStoreLocationId = {};
  public selectedRecipes: RecipeFto[] = []
  recipeClicked(changedRecipeFto: RecipeFto, changedTo: boolean) {
    console.log('recipeClicked(',changedRecipeFto,changedTo); // TODO: use this to conditionally add/remove
    let recipeIngredients = this.recipeService.recipeIngredients;
    let recipes = this.recipeService.recipeFtos;
    let ingredients = this.ingredientService.ingredientFtos;

    let storeSections = this.ingredientService.storeSectionFtos;
    this.selectedRecipes = recipes.filter(r => r.isChecked);

    let ingredientsWithQuantities: IngredientWithQuantityAndUses[] = [];

    for (let recipe of this.selectedRecipes) {

      const abbreviatedRecipeName = recipe.name.replace(/[a-z,+&.\s]/g, '') as string;
      const recipeIngredientsFiltered: RecipeIngredient[] = recipeIngredients.filter(ri => ri.recipeId === recipe.id) ?? [];

      for (let riFiltered of recipeIngredientsFiltered) {

        let existingIngredientWithQuantity = ingredientsWithQuantities.find(x => x.id === riFiltered.ingredientId);

        if (existingIngredientWithQuantity === undefined){
          let ingredient = ingredients.find(i => i.id === riFiltered.ingredientId) as Ingredient;
          const newGroceryIngredient: IngredientWithQuantityAndUses = {
            id: riFiltered.ingredientId,
            name: ingredient.name,
            unit: ingredient.unit,
            description: ingredient.description,
            storeSectionId: ingredient.storeSectionId,
            storeSectionName: storeSections.find(s => s.id === ingredient.storeSectionId)?.name ?? "",
            quantity: riFiltered.ingredientCount,
            addedRecipesUsedBy: [abbreviatedRecipeName]
          }
          ingredientsWithQuantities.push(newGroceryIngredient);

        } else {
          existingIngredientWithQuantity.quantity += riFiltered.ingredientCount;
          existingIngredientWithQuantity.addedRecipesUsedBy.push(abbreviatedRecipeName);
        }

      }
    }
    console.log('ingredientsWithQuantities',ingredientsWithQuantities);
    for (let section of storeSections) {
      this.ingredientWithQuantityByStoreLocationId[section.name] = ingredientsWithQuantities.filter(i => i.storeSectionName === section.name) as IngredientWithQuantityAndUses[] ?? [];
    }
    console.log('oxRecipeSelector.ingredientWithQuantityByStoreLocationId',this.ingredientWithQuantityByStoreLocationId);
  }
  ngOnInit(): void {

    // console.log('recipeService.recipes',this.recipeService.recipes);
    // console.log('ox-recipe-selector.recipesChecked',this.recipesChecked);
    // this.recipesChecked = this.recipeService.recipes.map(r => {
    //
    //   const tmp: Recipe_Checked = {
    //     id: r.id,
    //     name : r.name,
    //     url : r.url,
    //     isChecked: false
    //   }
    //   return tmp;
    // })


    // console.log('recipeService.recipes',this.recipeService.recipes);
    // console.log('ox-recipe-selector.recipesChecked',this.recipesChecked);

  }

}
