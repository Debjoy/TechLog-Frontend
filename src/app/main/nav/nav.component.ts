import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MainComponent } from '../main.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(private cookieService: CookieService, private route: Router, private mainComp: MainComponent) { }

  ngOnInit() {
  }

  onLogout(){
    this.cookieService.delete('token');
    this.route.navigate(['/login']);
  }

  showAbout(){
    this.mainComp.showAboutMain();
  }
  showTOS(){
    this.mainComp.showTOSMain();
  }

}
