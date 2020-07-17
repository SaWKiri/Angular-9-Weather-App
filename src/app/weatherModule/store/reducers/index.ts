import * as FavoritesReducer from './favorites.reducer';
import * as AreaWeatherReducer from './areaWeather.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { ModuleState } from '../states/index';

export const CITY_WEATHER_FEATURE = 'CITY_WEATHER_FEATURE';

export const reducers: ActionReducerMap<ModuleState> = {
  favorites: FavoritesReducer.reducer,
  areaWeather: AreaWeatherReducer.reducer,
}
