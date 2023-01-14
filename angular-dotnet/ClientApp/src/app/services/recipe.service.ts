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
export class RecipeService {
  private serviceUrl = '';

  constructor(private http: HttpClient, @Inject('BASE_URL') serviceUrl: string) {
    this.serviceUrl = serviceUrl + "Recipe";
  }

  getRecipes(): Observable<Recipe[]> {
    debugger;
    return this.http
      .get(`${this.serviceUrl}/GetAll`)
      .pipe<Recipe[]>(map((data: any) => data));
  }

  addOrUpdate(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.serviceUrl}/addOrUpdate`, recipe);
  }

  delete(recipe: Recipe): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.serviceUrl}/delete/${recipe.id}/`);
  }

}
