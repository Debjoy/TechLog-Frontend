import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json',
      'authKey':'vbryg7aj@jh9gsd.AShgf%'
   })
  };


  private getUrl = 'http://techlog-backend.herokuapp.com/users/get';
  private postUrl = 'http://techlog-backend.herokuapp.com/users/add';

  //usage - home, profile
  getResult(): Observable<any> {
    //dummy API
    return this.http.get(this.getUrl,this.httpOptions);
  }

  //usage - login
  addUser(user: any): Observable<any>{
    return this.http.post(this.postUrl,user,this.httpOptions);
  }

  //usage - login
  existsByEmailAndPassword(body: any): Observable<any>{
    return this.http.post("https://techlog-backend.herokuapp.com/users/existsByEmailAndPassword",body,this.httpOptions);
  }


  existsByUsernameAndToken(body: any): Observable<any>{
    return this.http.post("https://techlog-backend.herokuapp.com/users/existsByUsernameAndToken",body,this.httpOptions);
  }

  //demo api call local stub for checking if username exists in database
  findByUsername(_username: string): Observable<any>{
    return this.http.get("https://techlog-backend.herokuapp.com/users/findByUsername?username="+_username,this.httpOptions)
  }

  //demo api call local stub for checking if email id exists in database
  checkEmailExists(_email_id: string): Observable<any>{
    return this.http.get("https://techlog-backend.herokuapp.com/users/existsByEmail/"+_email_id,this.httpOptions);//for testing local stub
  }

  updateNameByEmail(body:any):Observable<any>{
    return this.http.post("http://techlog-backend.herokuapp.com/users/updateNameByEmail",body,this.httpOptions)
  }

  updateUserNameByEmail(body:any):Observable<any>{
    return this.http.post("http://techlog-backend.herokuapp.com/users/updateUsernameByEmail",body,this.httpOptions)
  }

  updatePasswordByEmail(body:any):Observable<any>
    {return this.http.post("http://techlog-backend.herokuapp.com/users/updatePasswordByEmail",body,this.httpOptions)
  }

}
