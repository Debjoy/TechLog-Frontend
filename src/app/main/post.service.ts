import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createPosts(body:any):Observable<any>
  {
    return this.http.post("https://techlog-backend.herokuapp.com/posts/create",body);
  }
  getPostById(body:any):Observable<any>
  {
    return this.http.get("https://techlog-backend.herokuapp.com/posts/getById?id="+body);
  }
}