import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() setDocTitle = new EventEmitter();
  isloggedIn: boolean

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.isloggedIn = this.loginService.isLoggedIn()
  }

  setHeading(pageTitle: String) {    
    this.setDocTitle.emit(pageTitle);
  }

  logout(){
    localStorage.removeItem('loginToken')
    this.ngOnInit()
    this.router.navigate(['signin'])
  }
}
