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
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ModuleState } from '../../store/states';
import { autoCompleteOption } from '../../models/autocomplete';
import { selectedCityActions } from '../../store/actions/selectedCity.action';
import { WeatherAppStoreService } from '../../services/weatherAppStoreFacade.service';
import { cityWeatherActions } from '../../store/actions/cityWeather.actions';
import { forcastActoions } from '../../store/actions/forcast.action';
import {
  GeoLocation,
  GeolocationService,
} from '../../services/geolocation.service';
import { favoriteAction } from '../../store/actions/favorites.actions';

@Component({
  selector: 'app-weatherbycity',
  templateUrl: './weatherbycity.component.html',
  styleUrls: ['./weatherbycity.component.css'],
})
export class WeatherbycityComponent implements OnInit, OnDestroy {
  autoCompleteValue: any;
  autoCompletedSuggestions: any[];
  autoCompleteInput: Subject<String> = new Subject<String>();
  inFavorites: 'accent' | 'primary' = 'primary';

  constructor(
    private accuweatherApiService: AccuweatherApiService,
    private _store: Store<ModuleState>,
    private geoLocationService: GeolocationService,
    public storeFacade: WeatherAppStoreService
  ) {
    this.autoCompleteInput
      .pipe(
        filter((data: string) => data.length > 0),
        debounceTime(600),
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
          this._store.dispatch(
            selectedCityActions.setSelectedCity({
              payload: {
                selectedCity: {
                  AdministrativeArea: null,
                  City: null,
                  Country: null,
                  Key: location.Key,
                  Rank: null,
                  Type: null,
                  Version: null,
                  LocalizedName: location.LocalizedName,
                } as autoCompleteOption,
              },
            })
          );

          this._store.dispatch(
            cityWeatherActions.getCurrentCityWeather({
              payload: { cityKey: location.Key },
            })
          );

          this._store.dispatch(
            forcastActoions.getForcast({
              payload: { cityKey: location.Key },
            })
          );
        })
      )
      .subscribe();

    this.checkFavorite();
  }

  selectSuggestion(option: autoCompleteOption) {
    this.autoCompleteValue = option.LocalizedName;
    this._store.dispatch(
      selectedCityActions.setSelectedCity({ payload: { selectedCity: option } })
    );
    this._store.dispatch(
      cityWeatherActions.getCurrentCityWeather({
        payload: { cityKey: option.Key },
      })
    );
    this._store.dispatch(
      forcastActoions.getForcast({
        payload: { cityKey: option.Key },
      })
    );
    this.checkFavorite();
  }

  checkFavorite() {
    this.storeFacade.favorites$
      .pipe(
        withLatestFrom(this.storeFacade.currentCityName$),
        map(([favorits, currentCityName]) => {
          let index = favorits.find((a) => a.LocalizedName === currentCityName);
          if (index) {
            this.inFavorites = 'accent';
          } else {
            this.inFavorites = 'primary';
          }
        })
      )
      .subscribe();
  }

  addRemoveFromFav() {
    this.storeFacade.currentSelectedCity$
      .pipe(
        tap((selectedCity) => {
          if (this.inFavorites === 'primary') {
            this._store.dispatch(
              favoriteAction.addFavorite({
                payload: {
                  fav: {
                    Key: selectedCity.Key,
                    LocalizedName: selectedCity.LocalizedName,
                  },
                },
              })
            );
          } else {
            this._store.dispatch(
              favoriteAction.removeFavorite({
                payload: {
                  fav: {
                    Key: selectedCity.Key,
                    LocalizedName: selectedCity.LocalizedName,
                  },
                },
              })
            );
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
