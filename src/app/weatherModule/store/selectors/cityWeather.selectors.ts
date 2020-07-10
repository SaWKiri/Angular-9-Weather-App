import { createSelector } from "@ngrx/store";
import { weatherAppSelector } from './common'
import { ModuleState } from "../states";


export const cityWeatherSelectors = {
  currentCityWeather: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.cityWeather),
}
