
import { environment } from '../../../environments/environment';

const baseUrl = environment.apiUrl;

const repositoryUrlGeoPositionUrl = baseUrl + '/locations/v1';
const repositoryUrlGeoPositioController = {
  geoPosition: repositoryUrlGeoPositionUrl + '/cities/geoposition/search',
  autoComplete: repositoryUrlGeoPositionUrl + '/cities/autocomplete',
}


const repositoryUrlForcastUrl = baseUrl + '/forecasts/v1';
const repositoryUrlForcastController = {
  getFiveDaysForcast: ( key:string ) => `${repositoryUrlForcastUrl}/daily/5day/${key}`
}


const repositoryUrlCurrentConditionUrl = baseUrl;
const repositoryUrlCurrentConditionController = {
  getCurrentCondition: (key:string) => `${repositoryUrlCurrentConditionUrl}/currentconditions/v1/${key}`
}


export const repositoryUrl = {
  geoposition:repositoryUrlGeoPositioController,
  forcasts: repositoryUrlForcastController,
  currentConditions: repositoryUrlCurrentConditionController
}
