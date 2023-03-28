import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {IngredientFto} from '../models/ingredientFto';
import {Recipe} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {StoreSection} from "../models/store-section";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root',
})
export class RecipeIngredientService {
  private recipeIngredientUrl = '';

  constructor(private http: HttpClient, backendService : BackendService) {
    this.recipeIngredientUrl = backendService.serviceUrl + "RecipeIngredient";
  }

  getRecipeIngredients(): Observable<RecipeIngredient[]> {
    debugger;
    return this.http
      .get(`${this.recipeIngredientUrl}/GetAll`)
      .pipe<RecipeIngredient[]>(map((data: any) => data));
  }

  addOrUpdate(recipeIngredient: RecipeIngredient): Observable<RecipeIngredient> {
    return this.http.post<RecipeIngredient>(`${this.recipeIngredientUrl}/addOrUpdate`, recipeIngredient);
  }

  delete(recipeId: string, ingredientId: string): Observable<IngredientFto> {
    return this.http.delete<IngredientFto>(`${this.recipeIngredientUrl}/delete/${recipeId}/${ingredientId}`);
  }

}
