import { Component, OnInit, NgModule } from '@angular/core';
import { FavoritesService } from '../../services/favorites.service';
import { CityWeather } from '../../models/CityWeather';
import { Favorite } from '../../models/favorite';
import { tap, distinctUntilChanged, take } from 'rxjs/operators';

@Component({
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: CityWeather[] = [];


  constructor(public favoritesService: FavoritesService) {
    this.favoritesService.getFavorites().pipe(
      // distinctUntilChanged((a,b) => JSON.stringify(a) === JSON.stringify(b)),
      tap(a => {
        this.favorites = a;
      })
    ).subscribe();
  }

  ngOnInit(): void {}

  extractName(link: string) {
    return this.extractFromArrayAt(link.split('/'), 4);
  }

  extractKey(link: string) {
    return this.extractFromArrayAt(link.split('/'), 3);
  }

  extractFromArrayAt(arr: any[], index: number) {
    return arr[arr.length - index];
  }

  removeFromFavorites(weather: CityWeather) {
    this.favoritesService.removeFromFavorites(
      this.extractName(weather.Link),
      this.extractKey(weather.Link)
    );
  }
}
