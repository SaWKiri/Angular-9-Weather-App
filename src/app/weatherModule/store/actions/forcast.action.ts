import { props, createAction } from '@ngrx/store';
import { Forcast } from '../../models/forcast';

export enum ForcastActionTypes {
  GET_FORCAST = '[Forcast] getForcast',
  APPLY_FORCAST = '[Forcast] applyForcast',
}

export const forcastActoions ={
  getForcast: createAction(
    ForcastActionTypes.GET_FORCAST,
    props<{payload: { cityKey: string }}>()
  ),
  applyForcast: createAction(
    ForcastActionTypes.APPLY_FORCAST,
    props<{payload: {forcast: Forcast}}>()
  ),
}
