import * as CityWeatherReducers from './cityWeather.reducer' ;
import * as SelectedCityReducer from './selectedCity.reducer';
import * as ForcastReducer from './forcast.reducer';
import * as FavoritesReducer from './favorites.reducer';
import * as AreaWeatherReducer from './areaWeather.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { ModuleState } from '../states/index';

export const CITY_WEATHER_FEATURE = 'CITY_WEATHER_FEATURE';

export const reducers: ActionReducerMap<ModuleState> = {
  cityWeather: CityWeatherReducers.reducer,
  selectedCity: SelectedCityReducer.reducer,
  forcast: ForcastReducer.reducer,
  favorites: FavoritesReducer.reducer,
  areaWeather: AreaWeatherReducer.reducer,
}
