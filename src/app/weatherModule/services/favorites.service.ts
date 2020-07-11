import { Injectable } from '@angular/core';
import { WeatherAppStoreService } from './weatherAppStoreFacade.service';
import { switchMap, take } from 'rxjs/operators';
import { AccuweatherApiService } from './accuweather-api.service';
import { Observable, zip } from 'rxjs';
import { CityWeather } from '../models/CityWeather';

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
      // take(1),
      switchMap((f) => {
        debugger;
        let data: Observable<CityWeather>[] = [];
        f.forEach((element) => {
          data.push(this.accuWeatherApi.getCurrentConditions(element.Key));
        });
        return zip(...data);
      })
    );
  }

  getCurrentWeather(key: string) {
    return this.accuWeatherApi.getCurrentConditions(key);
  }

  removeFromFavorites(name: string, key: string) {
    this.storeFacade.removeFromFavorites(key, name);
  }
}
