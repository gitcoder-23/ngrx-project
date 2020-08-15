import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../services/post.service';
import { EMPTY, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators'
import * as postAction from '../actions/post.actions'



@Injectable()
export class PostEffects {
  //Extra datastore for few moment
  HoldInsert: any = undefined;
  HoldUpdate: any = undefined;
  HoldDelete: string = undefined;

  loadPosts$ = createEffect(() => this.actions$.pipe(
    ofType(postAction.loadPosts),
    mergeMap(() => this.postService.getPosts()
      .pipe(
        map(posts => (postAction.loadPostsSuccess({ posts })),
          catchError(error => of(postAction.loadPostsFailure({ error }))))
      ))
    ));


  InsertPost$ = createEffect(() => this.actions$.pipe(
    ofType(postAction.insertPost),
    tap((action) => {
      this.HoldInsert = action.post;
    }),
    mergeMap((action) => this.postService.insertPosts(action.post).pipe(
      map((post, action) => {
        return postAction.insertPostsSuccess({ post: this.HoldInsert })
      }),
      catchError(error => of(postAction.insertPostsFailure({ error }))),
    )),
  ));


  UpdatePost$ = createEffect(() => this.actions$.pipe(
    ofType(postAction.updatePost),
    tap((action) => {
      this.HoldUpdate = action;
    }),
    mergeMap((action) => this.postService.updatePost(action.id, action.post).pipe(
      map((post) => {
        return postAction.updatePostsSuccess({
          post: {
            id: this.HoldUpdate.id,
            changes: this.HoldUpdate.post
          }
        });
      }),
      catchError(error => of(postAction.updatePostsFailure({ error })))
    ))
  ));


  DeletePost$ = createEffect(() => this.actions$.pipe(
    ofType(postAction.deletePost),
    tap((action)=>{
      this.HoldDelete = action.id;
    }),
    mergeMap((action)=>this.postService.deltePost(action.id).pipe(
      map((post)=>{
        return postAction.deletePostSuccess({id:this.HoldDelete})
      }),
      catchError(error => of(postAction.deletePostFaliure({error})))
    ))
  ));

  constructor(private actions$: Actions, private postService: PostService) { }

}
