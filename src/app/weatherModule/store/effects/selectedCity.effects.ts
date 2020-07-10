import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ModuleState } from "../states";
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { selectedCityActions } from '../actions/selectedCity.action';
import { tap, map } from 'rxjs/operators';
import { forcastActoions } from '../actions/forcast.action';
import {cityWeatherActions } from '../actions/cityWeather.actions';

@Injectable() export class SelectCityEffects {


  setelectedCity = createEffect(() => {
    return this.actions$.pipe(
      ofType(selectedCityActions.setSelectedCity),
      tap((selectedOption) =>{
        // this._store.dispatch(cityWeatherActions.getCurrentCityWeather({payload: {cityKey:selectedOption.payload.selectedCity.Key}}));
        // this._store.dispatch(forcastActoions.getForcast({payload : { cityKey: selectedOption.payload.selectedCity.Key}}));
      }),
      map((val)=> { return selectedCityActions.applySelectedCity({ payload: { selectedCity: val.payload.selectedCity } }) })
    )
  });



  constructor(
    private actions$: Actions,
    private accuweatherApiService:AccuweatherApiService,
    private _store: Store<ModuleState>
  ) { }
}
