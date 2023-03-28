import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {IngredientFto} from '../models/ingredientFto';
import {Recipe} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {StoreSection, StoreSectionFto} from "../models/store-section";
import {BackendService} from "./backend.service";

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientUrl = '';
  public ingredientFtos: IngredientFto[] = [];
  public storeSectionFtos: StoreSectionFto[] = [];

  constructor(private http: HttpClient, backendService : BackendService) {
    this.ingredientUrl = backendService.serviceUrl + "Ingredient";
  }

  getIngredients(): Observable<IngredientFto[]> {
    debugger;
    return this.http
      .get(this.ingredientUrl + "/GetAll")
      .pipe<IngredientFto[]>(map((data: any) => data));
  }

  updateIngredient(ingredient: IngredientFto): Observable<IngredientFto> {
    return this.http.patch<IngredientFto>(`${this.ingredientUrl}/update/${ingredient.id}`, ingredient);
  }

  addIngredient(ingredient: IngredientFto): Observable<IngredientFto> {
    return this.http.post<IngredientFto>(`${this.ingredientUrl}/add`, ingredient);
  }

  deleteIngredient(id: string): Observable<IngredientFto> {
    return this.http.delete<IngredientFto>(`${this.ingredientUrl}/delete/${id}`);
  }

  deleteIngredients(ingredients: IngredientFto[]): Observable<IngredientFto[]> {
    return forkJoin(
      ingredients.map((ingredient) =>
        this.http.delete<IngredientFto>(`${this.ingredientUrl}/${ingredient.id}`)
      )
    );
  }
}
