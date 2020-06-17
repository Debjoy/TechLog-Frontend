import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  isAuthenticated(){
    if(this.authenticated == true)
      return true;
    return false;
  }

  authenticate(){
    this.authenticated = true;
  }

  deAuthenticate(){
    this.authenticated = false;
  }
}
