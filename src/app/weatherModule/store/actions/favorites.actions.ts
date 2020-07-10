import { createAction, props } from '@ngrx/store';
import { autoCompleteOption } from '../../models/autocomplete';
import { Favorite } from '../../models/favorite';


enum FavoritesActionType{
  ADD_FAVORITE = '[Favorites] addFavorite',
  REMOVE_FAVORITE = '[Favorites] removeFavorite',
  APPLY_FAVORITE ='[Favorites] applyFavorite'
}


export const favoriteAction ={
  addFavorite: createAction(
    FavoritesActionType.ADD_FAVORITE,
    props<{payload: { fav: Favorite }}>()
  ),
  removeFavorite: createAction(
    FavoritesActionType.REMOVE_FAVORITE,
    props<{payload: { fav: Favorite }}>()
  ),
    applyFavorite: createAction(
      FavoritesActionType.APPLY_FAVORITE,
      props<{ payload: { favorits: string[] }}>()
    )
}
