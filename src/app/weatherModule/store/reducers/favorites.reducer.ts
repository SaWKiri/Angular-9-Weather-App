import { createReducer, on, Action } from '@ngrx/store';
import { update } from '../../../utils/update';
import { favoriteAction } from '../actions/favorites.actions';
import * as fromFavorites from '../states/favorites.state';
import { autoCompleteOption } from '../../models/autocomplete';
import { Favorite } from '../../models/favorite';

const favoritesReducer = createReducer(
  fromFavorites.initialState,
  on(favoriteAction.addFavorite, (state, action) => {
    if (
      state &&
      state.findIndex((arr) => arr.Key === action.payload.fav.Key) > -1
    ) {
      return state;
    } else {
      return update(state, {
        $push: [{
          Key: action.payload.fav.Key,
          LocalizedName: action.payload.fav.LocalizedName,
        }],
      });
    }
  }),
  on(favoriteAction.removeFavorite, (state, action) => {
    if (!state) {
      return state;
    }
    let index = state.findIndex((arr) => arr.Key == action.payload.fav.Key);
    if (index < 0) {
      return state;
    } else {
      return update(state, { $splice: [[index, 1]] });
    }
  })
);

export function reducer(state: autoCompleteOption[], action: Action) {
  return favoritesReducer(state, action);
}
