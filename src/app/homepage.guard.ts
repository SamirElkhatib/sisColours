import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "./services/authentication.service"



@Injectable()
export class HomepageGuard implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(["/login"], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
