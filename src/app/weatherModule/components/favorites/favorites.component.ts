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


  removeFromFavorites(weather: any) {
    debugger;
    this.favoritesService.removeFromFavorites(weather.LocalizedName, weather.Key);
  }
}
