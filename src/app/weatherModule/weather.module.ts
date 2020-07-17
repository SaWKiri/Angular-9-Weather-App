import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { HeaderComponent } from './components/header/header.component';
import {FooterComponent } from './components/footer/footer.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { WeatherbycityComponent } from './components/weatherbycity/weatherbycity.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ForcastCardComponent } from './components/weatherbycity/forcast-card/forcast-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { httpInterceptorProviders } from "./interceptors";
import { StoreModule } from '@ngrx/store';
import * as fromModule from './store/reducers'
import { EffectsModule } from '@ngrx/effects';
import {MatButtonModule} from '@angular/material/button';
import { EnglishOnlyDirective } from './directives/english-only.directive';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AreaWeatherEffect } from './store/effects/areaWeather.effects';


@NgModule({
  declarations: [WeatherComponent, HeaderComponent, FooterComponent, WeatherbycityComponent, ForcastCardComponent, EnglishOnlyDirective, FavoritesComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    EffectsModule.forFeature([AreaWeatherEffect]),
    StoreModule.forFeature(fromModule.CITY_WEATHER_FEATURE,fromModule.reducers),
  ],
  providers: []
})
export class WeatherModule { }
