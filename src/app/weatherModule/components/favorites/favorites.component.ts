import { Component, OnInit, NgModule } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { FavoriteWithCityWeather } from '../../models/favoriteWithCityWeather';

@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  constructor(public favoritesService: FavoritesService) {

  }

  ngOnInit(): void {}

  // Reference:
  // https://stackoverflow.com/questions/56203596/angular-material-button-not-clickable-when-iterating-over-new-objects-when-an-in
  trackByIndex(index, item) {
    return index;
  }

  removeFromFavorites(weather: FavoriteWithCityWeather) {
    this.favoritesService.removeFromFavorites(weather.LocalizedName, weather.Key);
  }
}
