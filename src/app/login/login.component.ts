import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  rusername: any;
  remail: any;
  rpassword: any;
  user: any;
  

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin(){
    console.log(this.email+this.password);
  }

  onRegister(){
    this.user = {
      "email": this.remail,
      "password": this.rpassword,
      "username": this.rusername
    }

    this.loginService.addUser(this.user).subscribe(res=>console.log('user registered'));
  }

}
