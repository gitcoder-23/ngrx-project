import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service'
import { selectPostFeature, TestAll, Test,selectPosts,singlePostBasedOnId} from 'src/app/selectors/post.selectors'
import { MainState } from 'src/app/reducers';
import { Store, select } from "@ngrx/store"
import { from, Observable } from 'rxjs';
import * as PostAciton from 'src/app/actions/post.actions';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Post } from "../../models/post"

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})


export class PostComponent implements OnInit {
  data: any;
  data$: Observable<Post[]>;

  uid: number;
  firstname: string;
  lastname: string;

  updatingId: number;


  constructor(
    private postService: PostService,
    private store: Store<MainState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.GetPostFromAPI();

  }

  doSave() {
    this.updatingId === undefined ?
      this.insert() :
      this.update(this.updatingId);
    
  }

  clearaData() {
    this.updatingId = undefined;
    this.uid = undefined;
    this.firstname = undefined;
    this.lastname = undefined;
  }

  getData() {
    return {
      id: this.uid,
      firstname: this.firstname,
      lastname: this.lastname
    }
  }

  setData(data) {
    this.uid = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
  }


  GetPostFromAPI() {
    // geting data form service unsing effct and dispatching aciton
    this.store.dispatch(PostAciton.loadPosts());
    this.data$ = this.store.pipe(select(selectPosts));

  }

  insert() {
    this.store.dispatch(PostAciton.insertPost({ post: this.getData()}));
     this.store.pipe(select(selectPosts));
    this.clearaData();
  }

  //when clicking on edit button settin id global to update  data after change
  edit(id) {
    this.updatingId = id

    //setting data to state 
    this.store.dispatch(PostAciton.SecelectPost({ postId: id }))

    //fetch data according to  id
    this.store.pipe(select(singlePostBasedOnId)).subscribe(
      //for not set data if action is compleated
      r => this.updatingId?this.setData(r):""
    )
  }

  update(id) {
    this.store.dispatch(PostAciton.updatePost({ id, post: this.getData() }));
    this.clearaData();
  }

  deletePost(id){
    this.store.dispatch(PostAciton.deletePost({id:id}))
  }

}
