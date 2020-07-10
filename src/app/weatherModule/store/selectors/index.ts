import { selectedCitySelectors } from './selectedCity.selectors';
import { cityWeatherSelectors } from './cityWeather.selectors';
import { forcastSelectors } from './forcast.selectors';
import { favoritesSelectors } from './favorites.selectors';

export const weatherAppSelectors = {
  optionSelectors: selectedCitySelectors,
  cityWeatherSelectors: cityWeatherSelectors,
  forcastSelectors: forcastSelectors,
  favoritesSelectors: favoritesSelectors
}
