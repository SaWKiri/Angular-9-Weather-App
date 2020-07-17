import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccuweatherApiService } from '../../services/accuweather-api.service';
import {
  filter,
  takeUntil,
  debounceTime,
  switchMap,
  map,
  tap,
  count,
  skip,
  withLatestFrom,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModuleState } from '../../store/states';
import { autoCompleteOption } from '../../models/autocomplete';
import { WeatherAppStoreService } from '../../services/weatherAppStoreFacade.service';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-weatherbycity',
  templateUrl: './weatherbycity.component.html',
  styleUrls: ['./weatherbycity.component.css'],
})
export class WeatherbycityComponent implements OnInit, OnDestroy {
  autoCompleteValue: any;
  autoCompletedSuggestions: any[];
  autoCompleteInput: Subject<String> = new Subject<String>();

  constructor(
    private accuweatherApiService: AccuweatherApiService,
    private geoLocationService: GeolocationService,
    public storeFacade: WeatherAppStoreService
  ) {
    this.autoCompleteInput
      .pipe(
        filter((data: string) => data.length > 0),
        debounceTime(900),
        switchMap((data: string) => {
          const a = this.accuweatherApiService.getAutoComplete(data);
          return a;
        })
      )
      .subscribe((suggestions: autoCompleteOption[]) => {
        this.autoCompletedSuggestions = suggestions;
      }, console.error);

    this.geoLocationService
      .getAccuWeatherByLocation()
      .pipe(
        tap((location) => {
          this.storeFacade.setAreaWeather(location.Key, location.LocalizedName);
        })
      )
      .subscribe();
  }

  selectSuggestion(option: autoCompleteOption) {
    this.autoCompleteValue = option.LocalizedName;
    this.storeFacade.setAreaWeather(option.Key, option.LocalizedName);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
