import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private getUrl = 'http://techlog-backend.herokuapp.com/users/get';
  private postUrl = 'http://techlog-backend.herokuapp.com/users/add';

  //usage - home, profile
  getResult(): Observable<any> {
    //dummy API
    return this.http.get(this.getUrl);
  }

  //usage - login
  addUser(user: any): Observable<any>{
    return this.http.post(this.postUrl,user);
  }
}
