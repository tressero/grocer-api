import {Component, Inject, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../models/ingredient';
import {Recipe} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {StoreSection} from "../models/store-section";

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

export class FetchDataComponent {
  @Input() recipes: Recipe[] = [];
  @Input() ingredients: Ingredient[] = [];
  @Input() recipeIngredients: RecipeIngredient[] = [];
  @Input() storeSections: StoreSection[] = [];

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
}




