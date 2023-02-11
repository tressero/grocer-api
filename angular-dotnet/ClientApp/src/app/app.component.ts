import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {Ingredient} from "./models/ingredient";
import {Recipe} from "./models/recipe";
import {RecipeIngredient} from "./models/recipe-ingredient";
import {StoreSection} from "./models/store-section";
import {RecipeIngredientService} from "./services/recipe-ingredient.service";
import {RecipeService} from "./services/recipe.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'Grocer - Home';
  public recipes: Recipe[] = []
  public ingredients: Ingredient[] = [];
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
              private recipeService: RecipeService) {

    http.get<Recipe[]>(baseUrl + 'Recipe').subscribe(
      result => { this.recipes = result; },
      error => console.error(error));

    http.get<RecipeIngredient[]>(baseUrl + 'RecipeIngredient').subscribe(
      result => { this.recipeIngredients = result; },
      error => console.error(error));

    http.get<Ingredient[]>(baseUrl + 'Ingredient').subscribe(
      result => { this.ingredients = result; },
      error => console.error(error));

    http.get<StoreSection[]>(baseUrl + 'StoreSection').subscribe(
      result => { this.storeSections = result; },
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
