import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent } from './weather.component';
import { WeatherbycityComponent } from './components/weatherbycity/weatherbycity.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes =
[
  {
    path: '', component: WeatherComponent, children:
      [
        { path: '',redirectTo: 'weatherbycity', pathMatch: 'full'},
        { path: 'weatherbycity', component: WeatherbycityComponent },
        { path: 'favorites', component: FavoritesComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
