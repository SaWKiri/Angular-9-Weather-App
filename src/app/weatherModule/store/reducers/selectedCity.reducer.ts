import { createReducer, on, Action } from '@ngrx/store';
import { update } from '../../../utils/update';
import { autoCompleteOption } from '../../models/autocomplete';
import { selectedCityActions } from '../actions/selectedCity.action';
import * as fromSelectedCity from '../states/selectedCity.state';

const selectedCityReducer = createReducer(
  fromSelectedCity.initialState,
  on(selectedCityActions.applySelectedCity, (state, action) => {
    return update(state, { $set: action.payload.selectedCity });
  }),
);

export function reducer(state: autoCompleteOption, action: Action) {
  return selectedCityReducer(state, action);
}
