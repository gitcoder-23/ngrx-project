import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { PostComponent } from "./post/post/post.component"
import { PostReducer } from './reducers/post.reducer';


const router:Routes =[
  {
    path:'',
    component:PostComponent,
    data:{
      title:'x'
    }
  },
  {
    path:'edit/:uid',
    component:PostComponent,
    data:{
      title:"edit post"
    }
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
