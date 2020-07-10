import { createSelector } from "@ngrx/store";
import { ModuleState } from "../states";
import { weatherAppSelector } from './common';


export const selectedCitySelectors = {
  selectedCity: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.selectedCity),
}
