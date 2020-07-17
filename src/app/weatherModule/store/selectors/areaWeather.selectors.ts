import { createSelector } from '@ngrx/store';
import { weatherAppSelector } from './common';
import { ModuleState } from '../states';

export const areaWeatherSelectors = {
  areaWeather: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather
  ),
  areaName: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather.AreaName
  ),
  areaKey: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather.AreaKey
  ),
  areaTemp: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather.Temperature
  ),
  areaWeatherText: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather.WeatherText
  ),
  areaWeatherIcon: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather.WeatherIcon
  ),
  areaWeatherForcast: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.areaWeather.Forcast
  ),
};
