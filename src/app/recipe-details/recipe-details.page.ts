import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { SpoonacularService, RecipeInfo, RecipeCard } from '../services/spoonacular.service';
import { FavoritesService } from '../services/favorites.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonText,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonIcon,
  ],
})
export class RecipeDetailsPage {
  loading = true;
  errorMsg = '';
  recipe?: RecipeInfo;
  measurementSystem: string = 'us';

  constructor(
    private route: ActivatedRoute,
    private api: SpoonacularService,
    private favoritesService: FavoritesService
  ) {
    addIcons({ heart, heartOutline });
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.loading = false;
      this.errorMsg = 'Invalid recipe id.';
      return;
    }

    this.api.getRecipeInformation(id).subscribe({
      next: (data: RecipeInfo) => {
        console.log('Recipe data:', data);
        console.log('Ingredients:', data.extendedIngredients);
        this.recipe = data;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.log('DETAILS ERROR:', err);
        this.loading = false;
        this.errorMsg = 'Failed to load recipe details.';
      },
    });
  }

  getIngredientText(ingredient: any): string {
    const ingredientName = ingredient.name || ingredient.original || '';
    
    if (this.measurementSystem === 'us') {
      if (ingredient.measures?.us) {
        const amount = ingredient.measures.us.amount || '';
        const unit = ingredient.measures.us.unitLong || ingredient.measures.us.unitShort || '';
        if (amount && unit) {
          return `${amount} ${unit} ${ingredientName}`.trim();
        }
      }
      return ingredient.original;
    } else {
      if (ingredient.measures?.metric) {
        const amount = ingredient.measures.metric.amount || '';
        const unit = ingredient.measures.metric.unitLong || ingredient.measures.metric.unitShort || '';
        if (amount && unit) {
          return `${amount} ${unit} ${ingredientName}`.trim();
        }
      }
      return ingredient.original;
    }
  }

  toggleFavorite() {
    if (this.recipe) {
      const recipeCard: RecipeCard = {
        id: this.recipe.id,
        title: this.recipe.title,
        image: this.recipe.image,
      };
      this.favoritesService.toggleFavorite(recipeCard);
    }
  }

  isFavorite(): boolean {
    return this.recipe ? this.favoritesService.isFavorite(this.recipe.id) : false;
  }

  getNumberedInstructions(): string[] {
    if (!this.recipe?.instructions) {
      return [];
    }

    // Remove HTML tags
    const text = this.recipe.instructions.replace(/<[^>]*>/g, '');
    
    // Split by common delimiters (periods followed by space/newline, or numbered lists)
    const steps = text
      .split(/\d+\.\s+|\.\s+(?=[A-Z])/)
      .map(s => s.trim())
      .filter(s => s.length > 10); // Filter out very short fragments

    return steps;
  }
}
