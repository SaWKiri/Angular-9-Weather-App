import { selectedCitySelectors } from './selectedCity.selectors';
import { cityWeatherSelectors } from './cityWeather.selectors';
import { forcastSelectors } from './forcast.selectors';
import { favoritesSelectors } from './favorites.selectors';
import { areaWeatherSelectors } from './areaWeather.selectors';

export const weatherAppSelectors = {
  areaWeatherSelectors: areaWeatherSelectors,
  optionSelectors: selectedCitySelectors,
  cityWeatherSelectors: cityWeatherSelectors,
  forcastSelectors: forcastSelectors,
  favoritesSelectors: favoritesSelectors
}
