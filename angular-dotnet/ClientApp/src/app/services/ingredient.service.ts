import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Ingredient} from '../models/ingredient';
import {Recipe} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {StoreSection} from "../models/store-section";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientUrl = '';

  constructor(private http: HttpClient, backendService : BackendService) {
    this.ingredientUrl = backendService.serviceUrl + "Ingredient";
  }

  getIngredients(): Observable<Ingredient[]> {
    debugger;
    return this.http
      .get(this.ingredientUrl + "/GetAll")
      .pipe<Ingredient[]>(map((data: any) => data));
  }

  updateIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.patch<Ingredient>(`${this.ingredientUrl}/update/${ingredient.id}`, ingredient);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${this.ingredientUrl}/add`, ingredient);
  }

  deleteIngredient(id: string): Observable<Ingredient> {
    return this.http.delete<Ingredient>(`${this.ingredientUrl}/delete/${id}`);
  }

  deleteIngredients(ingredients: Ingredient[]): Observable<Ingredient[]> {
    return forkJoin(
      ingredients.map((ingredient) =>
        this.http.delete<Ingredient>(`${this.ingredientUrl}/${ingredient.id}`)
      )
    );
  }
}
