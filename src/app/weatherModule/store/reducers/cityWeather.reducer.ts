import { createReducer, on, Action } from '@ngrx/store';
import { cityWeatherActions } from "../actions/cityWeather.actions";
import { update } from "../../../utils/update";
import { CityWeather } from "../../models/CityWeather";
import * as fromCityWeather from '../states/cityWeather.state'

const cityWeatherReducer = createReducer(
  fromCityWeather.initialState,
  on(cityWeatherActions.applyCurrentCityWeather,
      (state,action) => {
        return update(state, { $set: action.payload.currentCityWeather })}
    ),
);



export function reducer (state: CityWeather, action: Action) {
  return cityWeatherReducer(state,action);
}
