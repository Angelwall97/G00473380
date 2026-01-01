import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RecipeCard } from './spoonacular.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'favorites';
  private favoritesSubject = new BehaviorSubject<RecipeCard[]>(this.loadFavorites());
  favorites$ = this.favoritesSubject.asObservable();

  private loadFavorites(): RecipeCard[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveFavorites(favorites: RecipeCard[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): RecipeCard[] {
    return this.favoritesSubject.value;
  }

  isFavorite(recipeId: number): boolean {
    return this.getFavorites().some(r => r.id === recipeId);
  }

  addFavorite(recipe: RecipeCard): void {
    const favorites = this.getFavorites();
    if (!this.isFavorite(recipe.id)) {
      favorites.push(recipe);
      this.saveFavorites(favorites);
    }
  }

  removeFavorite(recipeId: number): void {
    const favorites = this.getFavorites().filter(r => r.id !== recipeId);
    this.saveFavorites(favorites);
  }

  toggleFavorite(recipe: RecipeCard): void {
    if (this.isFavorite(recipe.id)) {
      this.removeFavorite(recipe.id);
    } else {
      this.addFavorite(recipe);
    }
  }
}
