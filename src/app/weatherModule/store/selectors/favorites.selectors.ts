import { createSelector } from '@ngrx/store';
import { weatherAppSelector } from './common';
import { ModuleState } from '../states';


export const favoritesSelectors = {
  getFavorites: createSelector(
    weatherAppSelector,
    (state:ModuleState) => state.favorites),
}
