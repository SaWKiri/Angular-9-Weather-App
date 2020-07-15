import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { repositoryUrl } from './repository-urls';
import { CityWeather } from '../models/CityWeather';
import { Forcast } from '../models/forcast';
import { autoCompleteOption } from '../models/autocomplete';
import { AccuWeatherGeo } from '../models/accuWeatherGeo';
import { environment } from '../../../environments/environment';
import { GeoLocation } from '../models/geoLocation';

@Injectable({
  providedIn: 'root',
})
export class AccuweatherApiService {
  API_KEY = environment.API_KEY;

  constructor(private httpClient: HttpClient) {}

  getRequest(url, p?) {
    if (p) {
      const params = new HttpParams({
        fromObject: { apikey: this.API_KEY, ...p },
      });
      return this.httpClient.get<any>(url, { params });
    } else {
      const params = new HttpParams({ fromObject: { apikey: this.API_KEY } });
      return this.httpClient.get<any>(url, { params });
    }
  }

  getGeoPosition(geoPosition: GeoLocation): Observable<AccuWeatherGeo> {
    return this.getRequest(
      repositoryUrl.geoposition.geoPosition,
      { q: `${geoPosition.lat},${geoPosition.lon}`}
    );
  }

  getAutoComplete(key: string): Observable<autoCompleteOption[]> {
    return this.getRequest(repositoryUrl.geoposition.autoComplete, {q: `${key}`});
  }

  get5DaysOfForecasts(key: string, metric: boolean = true): Observable<Forcast> {
    return this.getRequest(
      repositoryUrl.forcasts.getFiveDaysForcast(key),
      {metric: metric}
    );
  }

  getCurrentConditions(key: string): Observable<CityWeather> {
    return this.getRequest(
      repositoryUrl.currentConditions.getCurrentCondition(key)
    );
  }
}
