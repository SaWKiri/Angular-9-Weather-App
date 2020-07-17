import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import { Store } from '@ngrx/store';
import { ModuleState } from '../states';
import { areaWeatherAction } from '../actions/areaWeather.action';
import { switchMap, map } from 'rxjs/operators';
import { of, zip } from 'rxjs';

@Injectable()
export class AreaWeatherEffect {
  getAreaWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(areaWeatherAction.getAreaWeather),
      switchMap((val) => {
        return zip(
          of(val.payload),
          this.accuweatherApiService.getCurrentConditions(val.payload.areaKey),
          this.accuweatherApiService.get5DaysOfForecasts(val.payload.areaKey, true)
        );
      }),
      map(([payload, cityWeather, forcast]) => {
        return areaWeatherAction.applyAreaWeather({
          payload: {
            areaWeather: {
              AreaKey: payload.areaKey,
              AreaName: payload.areaName,
              ...cityWeather[0],
              Forcast: forcast,
            },
          },
        });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private accuweatherApiService: AccuweatherApiService,
    private _store: Store<ModuleState>
  ) {}
}
