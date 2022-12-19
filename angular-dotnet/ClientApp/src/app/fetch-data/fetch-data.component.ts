import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];
  public recipes: Recipe[] = []
  public storeSections: StoreSection[] = [];
  public ingredients: Ingredient[] = [];
  public recipeIngredients: RecipeIngredient[] = [];
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

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

  }

}

interface Recipe {
  id: string;
  name: string;
  url: string;
}
interface RecipeIngredient {
  recipeId: string;
  ingredientId: string;
  ingredientCount: string;
}
interface Ingredient {
  id: string;
  name: string;
  description: string;
  unit: string;
  storeSectionId: string;
}
interface StoreSection {
  id: string;
  name: string;
}
interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
