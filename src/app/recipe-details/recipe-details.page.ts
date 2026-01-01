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
} from '@ionic/angular/standalone';

import { SpoonacularService, RecipeInfo } from '../services/spoonacular.service';

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
  ],
})
export class RecipeDetailsPage {
  loading = true;
  errorMsg = '';
  recipe?: RecipeInfo;
  measurementSystem: string = 'us';

  constructor(private route: ActivatedRoute, private api: SpoonacularService) {
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
}
