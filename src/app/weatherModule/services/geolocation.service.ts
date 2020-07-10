import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AccuweatherApiService } from './accuweather-api.service';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private geolocation: BehaviorSubject<GeoLocation> = new BehaviorSubject<GeoLocation>(null);

  constructor(private accuweatherApiService:AccuweatherApiService) {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.updatgeGeolocatgion({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      } as GeoLocation);
    });
  }

  updatgeGeolocatgion(location: GeoLocation) {
    this.geolocation.next(location);
  }

  getGeolocation(): GeoLocation {
    return this.geolocation.value;
  }

  getAccuWeatherByLocation() {
    if(this.geolocation.value !== null){
      return this.accuweatherApiService.getGeoPosition({lat: this.geolocation.value.lat, lon: this.geolocation.value.lon} as GeoLocation);
    }else {
      return this.accuweatherApiService.getGeoPosition({lat:32.109333, lon: 34.855499} as GeoLocation);
    }
  }
}

export interface GeoLocation {
  lat: number;
  lon: number;
}
