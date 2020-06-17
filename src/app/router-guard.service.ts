import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardService implements CanActivate{

  constructor(private adminService: AdminService, private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.adminService.isAuthenticated()) {
      return true;
    }

    // navigate to login page
    // this.router.navigate(['']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
  
}
