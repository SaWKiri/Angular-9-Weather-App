import { props, createAction } from '@ngrx/store';
import { autoCompleteOption } from '../../models/autocomplete';

enum SelectedCityActionTypes {
  SET_SELECTED_CITY = '[Selected City] setSelectedCity',
  APPLY_SELECTED_CITY = '[Selected City] applySelectedCity',
}

export const selectedCityActions = {
  setSelectedCity: createAction(
    SelectedCityActionTypes.SET_SELECTED_CITY,
    props<{ payload: { selectedCity: autoCompleteOption } }>()
  ),
  applySelectedCity: createAction(
    SelectedCityActionTypes.APPLY_SELECTED_CITY,
    props<{ payload: { selectedCity: autoCompleteOption } }>()
  ),
};
