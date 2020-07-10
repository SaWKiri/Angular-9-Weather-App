import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModuleState } from '../store/states/index';
import { filter, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { weatherAppSelectors } from '../store/selectors';
import { DailyForecast } from '../models/forcast';
import { autoCompleteOption } from '../models/autocomplete';
import { weatherAppSelector } from '../store/selectors/common';
import { Favorite } from '../models/favorite';
import { favoriteAction } from '../store/actions/favorites.actions';

@Injectable({
  providedIn: 'root',
})
export class WeatherAppStoreService {
  constructor(private _store: Store<ModuleState>) {}

  currentCityName$ = this._store.pipe(
    select(weatherAppSelectors.optionSelectors.selectedCity),
    filter((option) => option !== null),
    map((option) => option.LocalizedName)
  );

  currentCityTemp$ = this._store.pipe(
    select(weatherAppSelectors.cityWeatherSelectors.currentCityWeather),
    filter((cityWeather) => cityWeather !== null),
    map(
      (selectedCity) =>
        selectedCity.Temperature.Metric.Value +
        '' +
        selectedCity.Temperature.Metric.Unit
    )
  );
  cuurentWeatherIcon$ = this._store.pipe(
    select(weatherAppSelectors.cityWeatherSelectors.currentCityWeather),
    filter((a) => a !== null),
    map((currWeather) => currWeather.WeatherIcon)
  );

  currentWeatherText$ = this._store.pipe(
    select(weatherAppSelectors.cityWeatherSelectors.currentCityWeather),
    filter((a) => a !== null),
    map((currWeather) => currWeather.WeatherText)
  );

  fiveDayForcast$: Observable<DailyForecast[]> = this._store.pipe(
    select(weatherAppSelectors.forcastSelectors.cityForcast),
    filter((forcast) => forcast !== null),
    map((forcast) => forcast.DailyForecasts)
  );

  favorites$: Observable<Favorite[]> = this._store.pipe(
    select(weatherAppSelectors.favoritesSelectors.getFavorites),
    filter((a) => a !== null)
  );

  currentSelectedCity$: Observable<autoCompleteOption> = this._store.pipe(
    select(weatherAppSelectors.optionSelectors.selectedCity),
    tap((a) => a)
  );

  removeFromFavorites = (key: string, name: string) => {
    this._store.dispatch(
      favoriteAction.removeFavorite({
        payload: { fav: { Key: key, LocalizedName: name } },
      })
    );
  };
}
