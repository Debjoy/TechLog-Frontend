import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private cookieToken: any;
  private cookieUsername: any;

  constructor(private cookieService: CookieService, private router: Router, private loginService:LoginService,private spinner: NgxSpinnerService,private toastr:ToastrService) { }

  ngOnInit() {
    this.cookieToken = this.cookieService.get('token');
    this.cookieUsername = this.cookieService.get('user');
    let LoginData: any;
    this.spinner.show("spinner1");
    LoginData = {
      "username": this.cookieUsername ,
      "token": this.cookieToken
    }
    if(this.cookieToken == ''){
      this.router.navigate(['login']);
    }else{
      this.loginService.existsByUsernameAndToken(LoginData).subscribe(res=>{
        if(res != true){
          this.cookieService.set('token','');
          this.cookieService.set('user','');
          this.router.navigate(['login']);
        }else{
          console.log("Logged in Successfully");
          this.toastr.success('Logged in Successfully', 'Awesome!',{
            positionClass:'toast-top-right'
          });
          this.spinner.hide("spinner1");
        }
      }
      );
    }
  }

}
