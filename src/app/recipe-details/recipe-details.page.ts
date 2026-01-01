import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
} from '@ionic/angular/standalone';

import { SpoonacularService, RecipeInfo } from '../services/spoonacular.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  standalone: true,
  imports: [
    CommonModule,
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
  ],
})
export class RecipeDetailsPage {
  loading = true;
  errorMsg = '';
  recipe?: RecipeInfo;

  constructor(private route: ActivatedRoute, private api: SpoonacularService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.loading = false;
      this.errorMsg = 'Invalid recipe id.';
      return;
    }

    this.api.getRecipeInformation(id).subscribe({
      next: (data: RecipeInfo) => {
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
}
