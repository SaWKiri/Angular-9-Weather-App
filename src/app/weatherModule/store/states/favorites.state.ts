import { autoCompleteOption } from '../../models/autocomplete';
import { Favorite } from '../../models/favorite';
import { AreaWeather } from '../../models/areaWeather';


export interface FavoriteState {
  favorites: Favorite[];
}

export const initialState:Favorite[] = [];
