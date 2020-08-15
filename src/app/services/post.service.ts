import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PostService {
  header:any = {
    headers:{
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  post:any = {} //Coming from effect
  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get('http://localhost:3000/user');
  }

  insertPosts(data){
    return this.http.post("http://localhost:3000/create_user",data,this.header)
  }

  updatePost(postId,postData){
    return this.http.put(`http://localhost:3000/edit_user/${postId}`,postData,this.header)
  }

  deltePost(postId){
    return this.http.delete(`http://localhost:3000/del_user/${postId}`);
  }
}
