import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;

  //used for the login validation
  form1 = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]) ,
    password: new FormControl('',[Validators.required, 
                  Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&!^]{8,}$')])
  });

  //used for the registration validation
  form2 = new FormGroup({
    rusername: new FormControl('', [Validators.required]),
    remail: new FormControl('',[Validators.required, Validators.email]),
    rpassword: new FormControl('',[Validators.required,
                  Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&!^]{8,}$')]),
    rcpassword: new FormControl('', [Validators.required])
  }, this.pwdMatchValidator);

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  //Custom Validation for password... password matching with confirm password part
  pwdMatchValidator(frm: FormGroup){
    return frm.get('rpassword').value === frm.get('rcpassword').value ? null : {'mismatch': true};
  }

  onLogin(){
    console.log(this.form1.value.email+" "+this.form1.value.password);
  }

  onRegister(){
    this.user = {
      "email": this.form2.value.remail,
      "password": this.form2.value.rpassword,
      "username": this.form2.value.rusername
    }
    //console.log(this.user);
    this.loginService.addUser(this.user).subscribe(res=>console.log('user registered'));
  }

}
