import { createSelector } from '@ngrx/store';
import { ModuleState } from '../states';
import { weatherAppSelector } from './common';

export const forcastSelectors = {
  cityForcast: createSelector(
    weatherAppSelector,
    (state: ModuleState) => state.forcast
  ),
};
