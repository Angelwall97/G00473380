import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';
import { FavoritesService } from '../services/favorites.service';
import { RecipeCard } from '../services/spoonacular.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonButtons,
  ],
})
export class FavoritesPage implements OnInit {
  favorites: RecipeCard[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.loadFavorites();
    this.favoritesService.favorites$.subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  removeFavorite(event: Event, recipeId: number) {
    event.stopPropagation();
    event.preventDefault();
    this.favoritesService.removeFavorite(recipeId);
  }
}
