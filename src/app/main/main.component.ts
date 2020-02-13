import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private cookieVal: any;

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    this.cookieVal = this.cookieService.get('token');
    if(this.cookieVal == ''){
      this.router.navigate(['login']);
    }
  }

}
