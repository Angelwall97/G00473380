import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';

import { SpoonacularService, RecipeCard } from '../services/spoonacular.service';
import { FavoritesService } from '../services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
  ],
})
export class HomePage {
  ingredients = '';
  recipes: RecipeCard[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private api: SpoonacularService,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline });
  }

  search() {
    console.log('🔍 Search button clicked!');
    console.log('📝 Ingredients entered:', this.ingredients);
    
    this.errorMsg = '';
    this.recipes = [];

    const q = this.ingredients
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .join(',');

    console.log('🍳 Processed ingredients:', q);

    if (!q) {
      this.errorMsg = 'Please enter ingredients like: carrots, beef, potatoes';
      return;
    }

    this.loading = true;
    console.log('🌐 Making API call to Spoonacular...');

    this.api.findByIngredients(q, 10).subscribe({
      next: (res: RecipeCard[]) => {
        console.log('✅ API Response:', res);
        this.recipes = res ?? [];
        this.loading = false;

        if (this.recipes.length === 0) {
          this.errorMsg = 'No recipes found for those ingredients.';
        }
      },
      error: (err: unknown) => {
        console.log('❌ API ERROR:', err);
        this.loading = false;
        this.errorMsg = 'Spoonacular request failed (check console).';
      },
    });
  }

  toggleFavorite(recipe: RecipeCard) {
    this.favoritesService.toggleFavorite(recipe);
  }

  isFavorite(id: number): boolean {
    return this.favoritesService.isFavorite(id);
  }
}
