import { createAction, props } from '@ngrx/store';
import { AreaWeather } from '../../models/areaWeather';

enum AreaWeatherActionTypes {
  GET_AREA_WEATHER = '[Area Weather] getAreaWeather',
  APPLY_AREA_WEATHER = '[Area Weather] applyAreaWeather'
}

export const areaWeatherAction = {
  getAreaWeather: createAction(
    AreaWeatherActionTypes.GET_AREA_WEATHER,
    props<{ payload: { areaKey: string, areaName: string }}>()
  ),
  applyAreaWeather: createAction(
    AreaWeatherActionTypes.APPLY_AREA_WEATHER,
    props< { payload: { areaWeather: AreaWeather }}>()
  )
}
