import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {IngredientFto} from "./models/ingredientFto";
import {Recipe, RecipeFto} from "./models/recipe";
import {RecipeIngredient} from "./models/recipe-ingredient";
import {StoreSection} from "./models/store-section";
import {RecipeIngredientService} from "./services/recipe-ingredient.service";
import {RecipeService} from "./services/recipe.service";
import {IngredientService} from "./services/ingredient.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'Grocer - Home';
  public recipes: Recipe[] = []
  public ingredients: IngredientFto[] = [];
  public recipeIngredients: RecipeIngredient[] = [];
  public storeSections: StoreSection[] = [];

  initRecipeIngredients: any[] = [
    { name: 'id',     display: 'Id' },
    { name: 'name',   display: 'Name' }
  ];
  displayRecipeIngredients: any[] = this.initRecipeIngredients.map(col => col.name);

  initStoreSections: any[] = [
    { name: 'id',     display: 'Id' },
    { name: 'name',   display: 'Name' }
  ];
  displayStoreSections: any[] = this.initStoreSections.map(col => col.name);

  constructor(http: HttpClient,
              @Inject('BASE_URL') baseUrl: string,
              private recipeService: RecipeService,
              private ingredientService: IngredientService) {

    http.get<Recipe[]>(baseUrl + 'Recipe').subscribe(
      result => {
          this.recipes = result;
          this.recipeService.recipeFtos = this.recipes.map(r => {
            const recipeChecked: RecipeFto = {
              id: r.id,
              name: r.name,
              url: r.url,
              isChecked: false
              // At whatever user inputs that matter here
            }
            return recipeChecked;
          });
          console.log('recipes:',this.recipes)
        },
      error => console.error(error));

    http.get<RecipeIngredient[]>(baseUrl + 'RecipeIngredient').subscribe(
      result => {
        this.recipeIngredients = result;
        this.recipeService.recipeIngredients = result.map(ri => {
          const recipeChecked: RecipeIngredient = {
            recipeId: ri.recipeId,
            ingredientId: ri.ingredientId,
            ingredientCount: ri.ingredientCount
          }
          return recipeChecked;
        });
        console.log('recipeIngredients:',this.recipeIngredients)
      },
      error => console.error(error));

    http.get<IngredientFto[]>(baseUrl + 'Ingredient').subscribe(
      result => {
          /* Might break in weird ways since I requested as IngredientFto instead (out of laziness for now) */
          this.ingredients = result;
          this.ingredientService.ingredientFtos = result;
        },
      error => console.error(error));

    http.get<StoreSection[]>(baseUrl + 'StoreSection').subscribe(
      result => {
          this.storeSections = result;
          this.ingredientService.storeSectionFtos = result;
        },
      error => console.error(error));

    // debugger;
    // let tmp = this.recipeIngredients.map(x => x.)


  }


  addRecipe() {
    console.log('appComponent.addRecipe(');
    let newRecipe: Recipe = {
      id: crypto.randomUUID(),
      name: "",
      url: ""
    }
    this.recipeService.addOrUpdate(newRecipe).subscribe(() => {
      this.recipes.push(newRecipe);
    });
  }
}
