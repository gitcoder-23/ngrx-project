import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as formPost from "../reducers/post.reducer"

//state interface
export interface State{
  posts:formPost.PostState;
}

//reducre maybe
export const reducers:ActionReducerMap<State> = {
  posts:formPost.reducer
}

//for seleceting feature selector
export const selectPostFeature = createFeatureSelector<formPost.PostState>(formPost.postFeatureKey);

//selecting only entity or in other words actuals state
export const selectPostsEntities = createSelector(
  selectPostFeature,
  formPost => formPost.entities
)

export const currentSinglePostId = createSelector(
  selectPostFeature,
  //coming from state method wich is exported
  formPost.getSelectdPostId,
)

export const singlePostBasedOnId = createSelector(
  selectPostFeature,
  currentSinglePostId,
  (state,id)=>state.entities[id]
)

export const Test = createSelector(
  selectPostFeature,
  formPost.selectIds,
)

//get state and  convert entity object to arry
export const TestAll = createSelector(
  selectPostsEntities,
  entities=>Object.keys(entities).map(k => entities[k])
)

//same as converting to arrat like upper function
export const selectPosts = createSelector(
  selectPostFeature,
  formPost.selectAll
);


// export const getpostById = (state,id)=>{
//   let arrayindex = state.post.post.findIndex(index=>index.id == id)
//   return state.post.post[arrayindex];
// }