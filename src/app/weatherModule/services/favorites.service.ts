import { Injectable } from '@angular/core';
import { WeatherAppStoreService } from './weatherAppStoreFacade.service';
import { switchMap, take, map } from 'rxjs/operators';
import { AccuweatherApiService } from './accuweather-api.service';
import { Observable, zip, of } from 'rxjs';
import { CityWeather } from '../models/CityWeather';
import { AreaWeather } from '../models/areaWeather';
import { Favorite } from '../models/favorite';
import { FavoriteWithCityWeather } from '../models/favoriteWithCityWeather';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private storeFacade: WeatherAppStoreService,
    private accuWeatherApi: AccuweatherApiService
  ) {}

  getFavorites() {
    return this.storeFacade.favorites$.pipe(
      switchMap((favorites) => {
         const favoritesWithCityWeather = favorites.map((favorite) =>
          this.accuWeatherApi.getCurrentConditions(favorite.Key).pipe(
            map(
              (cityWeather) =>
                ({
                  ...favorite,
                  ...cityWeather,
                } as FavoriteWithCityWeather)
            )
          )
        );
        return zip(...favoritesWithCityWeather);
      })
    );
  }

  removeFromFavorites(name: string, key: string) {
    this.storeFacade.removeFromFavorites(key, name);
  }
}
