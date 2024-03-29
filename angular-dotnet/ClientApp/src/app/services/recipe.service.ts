import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {IngredientFto} from '../models/ingredientFto';
import {Recipe, RecipeFto} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {StoreSection, StoreSectionFto} from "../models/store-section";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeUrl = '';
  public recipeFtos : RecipeFto[] = [];
  public recipeIngredients: RecipeIngredient[] = [];


  constructor(private http: HttpClient, backendService : BackendService) {
    this.recipeUrl = backendService.serviceUrl + "Recipe";
  }

  getRecipes(): Observable<Recipe[]> {
    debugger;
    return this.http
      .get(`${this.recipeUrl}/GetAll`)
      .pipe<Recipe[]>(map((data: any) => data));
  }

  addOrUpdate(recipe: Recipe): Observable<Recipe> {
    console.log('AddOrUpdate(',recipe);
    return this.http.post<Recipe>(`${this.recipeUrl}/AddOrUpdate`, recipe);
  }

  delete(recipe: Recipe): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.recipeUrl}/delete/${recipe.id}/`);
  }

}
