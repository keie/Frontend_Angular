import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild,CanLoad {
  constructor(private authService:AuthService,private router:Router){

  }
  
  canLoad(route:Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin();
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error("Method not implemented.");
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  protected checkLogin(){
    if((this.authService.getToken()==null || this.authService.getToken()==='')){
      alert('you must login to continue');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
