import { Forcast } from './forcast';
import { CityWeather } from './CityWeather';

export class AreaWeather extends CityWeather{
  AreaName: string;
  AreaKey: string;
  Forcast: Forcast;
}
