import { createFeatureSelector } from '@ngrx/store';
import { ModuleState } from '../states';
import * as fromModule from '../reducers';


export const weatherAppSelector = createFeatureSelector<ModuleState>(fromModule.CITY_WEATHER_FEATURE);
