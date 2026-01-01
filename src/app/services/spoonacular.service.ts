import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RecipeCard {
  id: number;
  title: string;
  image: string;
}

export interface RecipeInfo {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  summary?: string;
  instructions?: string;
  extendedIngredients?: Array<{ original: string }>;
}

@Injectable({ providedIn: 'root' })
export class SpoonacularService {
  private readonly baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) {}

  // ✅ This matches your HomePage call: this.api.findByIngredients(q, 10)
  findByIngredients(ingredientsCsv: string, number = 10): Observable<RecipeCard[]> {
    const params = new HttpParams()
      .set('ingredients', ingredientsCsv)
      .set('number', String(number))
      .set('apiKey', environment.spoonacularApiKey);

    return this.http.get<RecipeCard[]>(`${this.baseUrl}/recipes/findByIngredients`, { params });
  }

  getRecipeInformation(id: number): Observable<RecipeInfo> {
    const params = new HttpParams().set('apiKey', environment.spoonacularApiKey);

    return this.http.get<RecipeInfo>(`${this.baseUrl}/recipes/${id}/information`, { params });
  }
}
