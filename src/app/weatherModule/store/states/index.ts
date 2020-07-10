
import { CityWeatherState } from './cityWeather.state';
import { SelectedCityState } from './selectedCity.state';
import { ForcastState } from './forcast.state';
import { FavoriteState } from './favorites.state';

export interface ModuleState extends CityWeatherState, SelectedCityState, ForcastState , FavoriteState{}
