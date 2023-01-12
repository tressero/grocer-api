import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Ingredient} from '../models/ingredient';
import {Recipe} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {StoreSection} from "../models/store-section";

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private serviceUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') serviceUrl: string) {
    this.serviceUrl = serviceUrl + "RecipeIngredient";
  }

  getRecipeIngredients(): Observable<RecipeIngredient[]> {
    debugger;
    return this.http
      .get(`${this.serviceUrl}/GetAll`)
      .pipe<RecipeIngredient[]>(map((data: any) => data));
  }

  add(recipeIngredient: RecipeIngredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.serviceUrl}/addOrUpdate`, recipeIngredient);
  }
  update(recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
    return this.http.post<RecipeIngredient>(`${this.serviceUrl}/addOrUpdate`, recipeIngredient);
  }

  delete(recipeId: string, ingredientId: string): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.serviceUrl}/delete/${recipeId}/${ingredientId}`);
  }

}
