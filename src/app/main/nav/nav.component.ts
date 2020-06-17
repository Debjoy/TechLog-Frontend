import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MainComponent } from '../main.component';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  clicks=0;
  constructor(private cookieService: CookieService, private route: Router, private mainComp: MainComponent, private adminService: AdminService) { }

  ngOnInit() {
  }

  onLogout(){
    this.adminService.deAuthenticate();
    this.cookieService.delete('token');
    this.route.navigate(['/login']);
  }

  showAbout(){
    this.mainComp.showAboutMain();
  }
  showTOS(){
    this.mainComp.showTOSMain();
  }

  openAdmin(){
    this.clicks++;
    if(this.clicks == 5){
      this.clicks = 0;
      this.route.navigate(['/admin']);
    }
  }

}
