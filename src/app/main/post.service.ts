import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'authKey':'vbryg7aj@jh9gsd.AShgf%'
   })
  };
  createPosts(body:any):Observable<any>
  {
    return this.http.post("https://techlog-backend.herokuapp.com/posts/create",body,this.httpOptions);
  }
  getPostById(body:any):Observable<any>
  {
    return this.http.get("https://techlog-backend.herokuapp.com/posts/getById?id="+body,this.httpOptions);
  }

  saveTextById(body:any):Observable<any>
  {
    return this.http.post("https://techlog-backend.herokuapp.com/posts/updateTextById",body,this.httpOptions);
  }

  getAllByUsername(body:any):Observable<any>
  {
    return this.http.get("https://techlog-backend.herokuapp.com/posts/getAllByUsername?username="+body,this.httpOptions);
  }

  updateImageById(body:any):Observable<any>
  {
    return this.http.post("https://techlog-backend.herokuapp.com/posts/updateImageById",body,this.httpOptions);
  }
}