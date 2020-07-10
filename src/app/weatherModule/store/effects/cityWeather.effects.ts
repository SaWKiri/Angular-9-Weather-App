import { Injectable } from "@angular/core";
import { cityWeatherActions } from '../actions/cityWeather.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ModuleState } from "../states";
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { switchMap, map } from 'rxjs/operators';
import { forcastActoions } from "../actions/forcast.action";




@Injectable() export class CityWeatherEffects {

  getCurrentCityWeather$ = createEffect(
    () => {
        return this.actions$.pipe(
        ofType(cityWeatherActions.getCurrentCityWeather),
        switchMap((val) => {
          const currCityWeather = this.accuweatherApiService.getCurrentConditions(val.payload.cityKey);
          return currCityWeather;
        }),
        map((val)=> { return cityWeatherActions.applyCurrentCityWeather({ payload: { currentCityWeather: val } }) })
        );
    }
  );




  constructor(
    private actions$: Actions,
    private accuweatherApiService:AccuweatherApiService,
    private _store: Store<ModuleState>
  ) { }
}
