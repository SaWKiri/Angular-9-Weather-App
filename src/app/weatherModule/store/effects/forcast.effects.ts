import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ModuleState } from "../states";
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { forcastActoions } from '../actions/forcast.action';
import { switchMap, map } from 'rxjs/operators';



@Injectable() export class ForcastEffects {

  getForcastEffect$ = createEffect(
    ()=> {
      return this.actions$.pipe(
        ofType(forcastActoions.getForcast),
        switchMap((val)=> {
          const forcast = this.accuweatherApiService.get5DaysOfForecasts(val.payload.cityKey);
          return forcast;
        }),
        map((forcast) => {
          return forcastActoions.applyForcast({payload: { forcast: forcast}})
        })
      )
    }
  );

  constructor(
    private actions$: Actions,
    private accuweatherApiService:AccuweatherApiService,
    private _store: Store<ModuleState>
  ) { }
}
