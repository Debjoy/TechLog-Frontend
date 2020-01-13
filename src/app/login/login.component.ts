import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/internal/operators';
import { stringify } from '@angular/compiler/src/util';

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
    //added debounceTime to make sure http calls are fired once user stops typing.
    //custorm Validator for checking if username exists or not
    this.form2.controls.rusername.valueChanges.pipe(
        debounceTime(500),//change this value if required
        distinctUntilChanged(),
        switchMap(() =>{
          return this.loginService.findByUsername(this.form2.value.rusername)
        }))
        .subscribe((res:any) => {
          //console.log(res);
          if(res.length > 0) {
            this.form2.controls.rusername.setErrors({'user_name_exists': true});
          }
        });

    //custorm Validator for checking if email id exists or not
    this.form2.controls.remail.valueChanges.pipe(
        debounceTime(500),//change this value if required
        distinctUntilChanged(),
        switchMap(() =>{
          return this.loginService.checkEmailExists(this.form2.value.remail)
        }))
        .subscribe((res:any) => {
          //console.log(res);
          if(res === true) {
            this.form2.controls.remail.setErrors({'email_id_exists': true});
          }
        });
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