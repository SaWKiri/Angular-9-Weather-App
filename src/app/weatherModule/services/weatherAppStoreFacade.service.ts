import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModuleState } from '../store/states/index';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { weatherAppSelectors } from '../store/selectors';
import { DailyForecast } from '../models/forcast';
import { Favorite } from '../models/favorite';
import { favoriteAction } from '../store/actions/favorites.actions';
import { TempSelectionService } from './tempSelection.service';
import { areaWeatherAction } from '../store/actions/areaWeather.action';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppStoreService {
  constructor(
    private _store: Store<ModuleState>,
    private tempSelectionService: TempSelectionService
  ) {}

  areaWeather$ = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaWeather)
  );

  currentCityName$ = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaName),
    filter((option) => option !== null)
  );
  currentCityKey$ = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaKey)
  );

  currentCityTemp$ = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaTemp),
    filter((temp) => temp !== null),
    map((temp) => {
      if (temp !== undefined) {
        if (this.tempSelectionService.getIsCelsius()) {
          return temp.Metric.Value + ' ' + temp.Metric.Unit;
        }
        return temp.Imperial.Value + ' ' + temp.Imperial.Unit;
      }
    })
  );
  cuurentWeatherIcon$ = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaWeatherIcon),
    filter((a) => a !== null)
  );

  currentWeatherText$ = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaWeatherText),
    filter((a) => a !== null)
  );

  fiveDayForcast$: Observable<DailyForecast[]> = this._store.pipe(
    select(weatherAppSelectors.areaWeatherSelectors.areaWeatherForcast),
    filter((forcast) => forcast !== null),
    map((forcast) => forcast.DailyForecasts)
  );

  favorites$: Observable<Favorite[]> = this._store.pipe(
    select(weatherAppSelectors.favoritesSelectors.getFavorites),
    filter((a) => a !== null)
  );

  setAreaWeather = (key: string, name: string) => {
    this._store.dispatch(
      areaWeatherAction.getAreaWeather({
        payload: { areaKey: key, areaName: name },
      })
    );
  };

  addToFavorites = (key: string, name: string) => {
    this._store.dispatch(
      favoriteAction.addFavorite({
        payload: { fav: { Key: key, LocalizedName: name } },
      })
    );
  };

  removeFromFavorites = (key: string, name: string) => {
    this._store.dispatch(
      favoriteAction.removeFavorite({
        payload: { fav: { Key: key, LocalizedName: name } },
      })
    );
  };
  isInFavorites = (key: string): Observable<'accent' | 'primary'> => {
    return this._store.pipe(
      select(weatherAppSelectors.favoritesSelectors.getFavorites),
      map((favorites) => {
        return favorites.findIndex((f) => f.Key === key) >= 0
          ? 'accent'
          : 'primary';
      })
    );
  };
}
