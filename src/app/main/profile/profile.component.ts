import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name: any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getResult();
  }

  getResult(){
    this.loginService.getResult().subscribe(res => {
      this.name = res.employee_name;
      //console.log(res.employee_name);
    });
  }

}
