import { props, createAction } from '@ngrx/store';
import { CityWeather } from '../../models/CityWeather';



enum CityWeatherActionTypes {
  GET_CURRENT_CITY_WEATHER = '[City Weather] getCurrentCityWeather',
  GET_FORCASTS_CITY_WEATHER = '[City Weather] getForcastCityWeather',
  APPLY_CURRENT_CITY_WEATHER = '[City Weather] applyCurrentCityWeather',
}



export const cityWeatherActions = {
  getCurrentCityWeather: createAction(
    CityWeatherActionTypes.GET_CURRENT_CITY_WEATHER,
    props<{payload: { cityKey: string } }>()
  ),

  applyCurrentCityWeather: createAction(
    CityWeatherActionTypes.APPLY_CURRENT_CITY_WEATHER,
    props<{payload: { currentCityWeather: CityWeather }} >()
  )
};

