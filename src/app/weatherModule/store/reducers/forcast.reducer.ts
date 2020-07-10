import { createReducer, on, Action } from '@ngrx/store';
import { forcastActoions } from '../actions/forcast.action'
import { update } from "../../../utils/update";
import * as fromForcast from '../states/forcast.state';
import { Forcast } from '../../models/forcast';



const forcastReducer = createReducer(
  fromForcast.initialState,
  on(forcastActoions.applyForcast,
    (state,action) => {
      return update(state, { $set: action.payload.forcast})})
);


export function reducer(state: Forcast, action: Action) {
  return forcastReducer(state,action);
}
