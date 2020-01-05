import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;

  constructor() { }

  ngOnInit() {
  }

  onLogin(){
    console.log(this.email+this.password);
  }

}
