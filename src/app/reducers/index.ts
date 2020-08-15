import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {PostState,PostReducer} from "./post.reducer"





export interface MainState {
 post:PostState;

}

export const reducers: ActionReducerMap<MainState> = {
  post:PostReducer,

};



export const metaReducers: MetaReducer<MainState>[] = !environment.production ? [] : [];
