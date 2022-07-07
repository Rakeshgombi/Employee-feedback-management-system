import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorised(route)
  }
  private isAuthorised(route: ActivatedRouteSnapshot): boolean {
    let roles= Array(this.loginService .haveAccess())
    let expectedRoles = route.data['expectedRoles'];
    let roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1)
    return roleMatches < 0? false : true
  }
}
