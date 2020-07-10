import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { repositoryUrl } from './repository-urls'
import { CityWeather } from '../models/CityWeather';
import { Forcast } from '../models/forcast';
import { autoCompleteOption } from '../models/autocomplete';
import { GeoLocation } from './geolocation.service';
import { AccuWeatherGeo } from '../models/accuWeatherGeo';

@Injectable({
  providedIn: 'root'
})
export class AccuweatherApiService {

  // API_KEY = 'RIrkfkXYu5DBbb9upLXHyk9AKkPUPtK0';
  API_KEY = 'waAaEwlCoR3BA9uHpA4THbY6nVZrrQj3';


  constructor(private httpClient: HttpClient) { }

  getRequest(url, q?) {
    let headers = new HttpHeaders({
      'Content-Type': 'plain/text',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    });
    if(q) {
      const params = new HttpParams({fromObject: { apikey: this.API_KEY, q}});
      return this.httpClient.get<any>(url, { headers,params });
    }else {
      const params = new HttpParams({fromObject: { apikey: this.API_KEY}});
      return this.httpClient.get<any>(url, { headers,params });
    }
  }

  getGeoPosition(geoPosition: GeoLocation): Observable<AccuWeatherGeo> {
    return this.getRequest(repositoryUrl.geoposition.geoPosition, `${geoPosition.lat},${geoPosition.lon}`);
  }

  getAutoComplete(key: string): Observable<autoCompleteOption[]> {
    return this.getRequest(repositoryUrl.geoposition.autoComplete, `${key}`);
  }

  get5DaysOfForecasts(key: string): Observable<Forcast> {
    return this.getRequest(repositoryUrl.forcasts.getFiveDaysForcast(key));
  }


  getCurrentConditions(key: string): Observable<CityWeather> {
    return this.getRequest(repositoryUrl.currentConditions.getCurrentCondition(key));
  }

}
