import { autoCompleteOption } from '../../models/autocomplete';

export interface SelectedCityState {
  selectedCity: autoCompleteOption;
}

export const initialState: autoCompleteOption = null;
