import { createSelector } from '@ngrx/store';
import { weatherAppSelector } from './common';
import { ModuleState } from '../states';


export const areaWeatherSelectors = {
  areaWeather: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather),
}
