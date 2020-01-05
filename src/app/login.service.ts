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

  private dummyUrl = 'http://dummy.restapiexample.com/api/v1/employee/1';

  //usage - home, profile
  getResult(): Observable<any> {
    //dummy API
    return this.http.get(this.dummyUrl);
  }
}
