import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private loginServices: LoginService, private router: Router){}
  
  canActivate() {
    console.log(this.loginServices.haveAccess())
    return true;
  }
}
