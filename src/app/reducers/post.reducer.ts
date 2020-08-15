import { Action, createReducer, on, createFeatureSelector, createSelector, State } from '@ngrx/store';
import * as postAction from '../actions/post.actions'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Post } from "../models/post"


export const postFeatureKey = 'post';



//created entity state( interface)
export interface PostState extends EntityState<Post> {
  error: any;
  currentSelectedPost: number;
}

//creating entity adapter(interface)
export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

//generating initial state using entity
export const initialState: PostState = adapter.getInitialState({
  error: undefined,
  currentSelectedPost: null,
})

//reducer which are setting value
export const PostReducer = createReducer(
  initialState,

  //for getting all data from database
  on(postAction.loadPostsSuccess, (state, action) => {
    return adapter.addAll(action.posts, state)
  }),

  //for insterting a single data into database and state
  on(postAction.insertPostsSuccess, (state, action) => {
    return adapter.addOne(action.post, state);
  }),

  //stting error if thair is any erro in insert
  on(postAction.insertPostsFailure, (state, action) => ({
    ...state,
    error: action.error

  })),

  //setting id to  state
  on(postAction.SecelectPost, (state, action) => {
    return { ...state, currentSelectedPost: action.postId };
  }),

  //for update a single data into database and state
  on(postAction.updatePostsSuccess, (state, action) => {
    return adapter.updateOne(action.post, state);
  }),

  //for successful delete data also delete from store
  on(postAction.deletePostSuccess,(state,action)=>{
    return adapter.removeOne(action.id,state)
  }),

  //for unsuccessful delete error will add to store
  on(postAction.deletePostFaliure,(state,action)=>({
    ...state,
    error:action.error
  }))
);

//getting and exporting state to access from another file Selector
export const getSelectdPostId = (state:PostState) => { return state.currentSelectedPost};

// for exporting this reducer to index reducer
export function reducer(state: PostState, action: Action) {
  return PostReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal } = adapter.getSelectors(); //Object Distructuring

