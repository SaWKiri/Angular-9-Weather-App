import { Injectable } from '@angular/core';
import { WeatherAppStoreService } from './weatherAppStoreFacade.service';
import { switchMap, take, map } from 'rxjs/operators';
import { AccuweatherApiService } from './accuweather-api.service';
import { Observable, zip, of } from 'rxjs';
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
      switchMap((f) => {
        let data: Observable<CityWeather>[] = [];
        if(f.length === 0)
        {
          return of([]);
        }
        f.forEach((element) => {
          data.push(this.accuWeatherApi.getCurrentConditions(element.Key));
        });
        return zip(...data);
      }),
      map(zip => zip)
    );
  }

  getCurrentWeather(key: string) {
    return this.accuWeatherApi.getCurrentConditions(key);
  }

  removeFromFavorites(name: string, key: string) {
    this.storeFacade.removeFromFavorites(key, name);
  }
}
