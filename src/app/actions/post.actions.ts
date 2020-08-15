import { createAction, props, Action } from '@ngrx/store';
import{Post} from '../models/post'
import { Update } from '@ngrx/entity';


//load post list
export const loadPosts = createAction(
  '[Post List Component] Load Posts'
);

export const loadPostsSuccess = createAction(
  '[Post List Effect] Load Posts Success',
  props<{ posts: any }>()
);

export const loadPostsFailure = createAction(
  '[Post List Effect] Load Posts Failure',
  props<{ error: any }>()
);

//load single post
//using selector
export const SecelectPost = createAction(
  '[Current Post ID Component & Reducer] Select Single Posts',
  props<{postId:number}>()
);

//insert post
export const insertPost = createAction(
  '[insert post Component] Load Posts',
  props<{ post: any }>()
);

export const insertPostsSuccess = createAction(
  '[isert post Effect] Load Posts Success',
  props<{ post: any }>() //'props' is to repless as Constructor
);

export const insertPostsFailure = createAction(
  '[insert post Effect] Load Posts Failure',
  props<{ error: any }>()
);


//update post
export const updatePost = createAction(
  '[update post Component] Load Posts',
  props<{ post: any ;id:number}>()
);

export const updatePostsSuccess = createAction(
  '[update post Effect] update Post Success',
  props<{ post:Update<Post>}>()
);

export const updatePostsFailure = createAction(
  '[update post Effect] update Post Failure',
  props<{ error: any }>()
);

//delete post
export const deletePost = createAction(
  '[Delete post Component] Delete post',
  props<{id:string}>()
);

export const deletePostSuccess = createAction(
'[Delete post Effect] Delete post Success',
props<{id:string}>()
)

export const deletePostFaliure = createAction(
  '[Delete post Effect] Delete post Failure',
  props<{error:any}>()
)

