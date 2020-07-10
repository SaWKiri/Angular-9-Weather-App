import { autoCompleteOption } from '../../models/autocomplete';
import { Favorite } from '../../models/favorite';


export interface FavoriteState {
  favorites: Favorite[];
}

export const initialState:Favorite[] = [];
