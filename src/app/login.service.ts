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
      'Content-Type': 'application/json'
   })
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

  //usage - login
  existsByEmailAndPassword(body: any): Observable<any>{
    return this.http.post("https://techlog-backend.herokuapp.com/users/existsByEmailAndPassword",body);
  }


  existsByUsernameAndToken(body: any): Observable<any>{
    return this.http.post("https://techlog-backend.herokuapp.com/users/existsByUsernameAndToken",body);
  }

  //demo api call local stub for checking if username exists in database
  findByUsername(_username: string): Observable<any>{
    return this.http.get("https://techlog-backend.herokuapp.com/users/findByUsername?username="+_username)
  }

  //demo api call local stub for checking if email id exists in database
  checkEmailExists(_email_id: string): Observable<any>{
    return this.http.get("https://techlog-backend.herokuapp.com/users/existsByEmail/"+_email_id);//for testing local stub
  }

  updateNameByEmail(body:any):Observable<any>{
    return this.http.post("http://techlog-backend.herokuapp.com/users/updateNameByEmail",body)
  }

  updateUserNameByEmail(body:any):Observable<any>{
    return this.http.post("http://techlog-backend.herokuapp.com/users/updateUsernameByEmail",body)
  }

  updatePasswordByEmail(body:any):Observable<any>
    {return this.http.post("http://techlog-backend.herokuapp.com/users/updatePasswordByEmail",body)
  }

}
