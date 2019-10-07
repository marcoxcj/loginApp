import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../servicios/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public router:Router,
    public afAuth: AngularFireAuth,
    public authService:AuthService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.afAuth.authState
    .pipe(take(1)).pipe(map(authState=> !! authState))
    .pipe(tap(authenticated=>{
      if(!authenticated){
        this.router.navigate(['/login']);
      }
    }));
  }

}
