import * as fromAreaWeather from '../states/areaWeather.state';
import { areaWeatherAction } from '../actions/areaWeather.action';
import { AreaWeather } from '../../models/areaWeather';
import { Action, createReducer, on } from '@ngrx/store';
import { update } from 'src/app/utils/update';

const areaWeatherReducer = createReducer(
  fromAreaWeather.initialState,
  on(areaWeatherAction.applyAreaWeather, (state, action) => {
    return update(state, { $set: action.payload.areaWeather });
  })
);

export function reducer(state: AreaWeather, action: Action) {
  return areaWeatherReducer(state, action);
}
