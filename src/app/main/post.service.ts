import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PostService {
  api_prefix = "https://techlog-backend.herokuapp.com/";

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      authKey: "vbryg7aj@jh9gsd.AShgf%",
    }),
  };

  createPosts(body: any): Observable<any> {
    return this.http.post(
      this.api_prefix + "posts/create",
      body,
      this.httpOptions
    );
  }
  getPostById(body: any): Observable<any> {
    return this.http.get(
      this.api_prefix + "posts/getById?id=" + body,
      this.httpOptions
    );
  }

  getAllPosts(): Observable<any> {
    return this.http.get(this.api_prefix + "posts/getAll", this.httpOptions);
  }

  saveTextById(body: any): Observable<any> {
    return this.http.post(
      this.api_prefix + "posts/updateTextById",
      body,
      this.httpOptions
    );
  }

  getAllByUsername(body: any): Observable<any> {
    return this.http.get(
      this.api_prefix + "posts/getAllByUsername?username=" + body,
      this.httpOptions
    );
  }

  updateImageById(body: any): Observable<any> {
    return this.http.post(
      this.api_prefix + "posts/updateImageById",
      body,
      this.httpOptions
    );
  }

  deletePostById(body: any): Observable<any> {
    return this.http.post(this.api_prefix + "posts/deletePostById", body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authKey: "vbryg7aj@jh9gsd.AShgf%",
      }),
      responseType: "text",
    });
  }

  addLike(body: any): Observable<any> {
    return this.http.post(
      this.api_prefix + "likes/add",
      body,
      this.httpOptions
    );
  }
  getLikeByPost(body: any): Observable<any> {
    return this.http.get(
      this.api_prefix + "likes/getAllByPostid?postid=" + body,
      this.httpOptions
    );
  }

  deleteLike(body: any): Observable<any> {
    return this.http.post(this.api_prefix + "likes/deleteLikeById", body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authKey: "vbryg7aj@jh9gsd.AShgf%",
      }),
      responseType: "text",
    });
  }

  addComment(body: any): Observable<any> {
    return this.http.post(
      this.api_prefix + "comments/add",
      body,
      this.httpOptions
    );
  }

  deleteComment(body: any): Observable<any> {
    return this.http.post(
      this.api_prefix + "comments/deleteCommentById",
      body,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          authKey: "vbryg7aj@jh9gsd.AShgf%",
        }),
        responseType: "text",
      }
    );
  }

  getCommentsByPostid(postid: any): Observable<any> {
    return this.http.get(
      this.api_prefix + "comments/getAllByPostid?postid=" + postid,
      this.httpOptions
    );
  }

  getSearchResult(word: any): Observable<any> {
    return this.http.get(
      this.api_prefix + "posts/search?=" + word,
      this.httpOptions
    )
  }
}
