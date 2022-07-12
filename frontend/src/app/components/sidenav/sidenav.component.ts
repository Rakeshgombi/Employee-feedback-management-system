import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from '../common/app-error';
import { EmployeesService } from '../services/employees.service';
import { EvaluatorsService } from '../services/evaluators.service';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class SidenavComponent implements OnInit {
  reload() {
    // reload the component

  }
  @Output() setDocTitle = new EventEmitter();
  isloggedIn: boolean
  LoggedInUserEmail: any;
  LoggedInUserRole: any;
  profile: any;
  constructor(private loginService: LoginService, private router: Router, private userService: UserService, private evaluatorsService: EvaluatorsService, private employeeService: EmployeesService) { }

  getProfile(email: String, service: any) {
    service.getAll()
      .subscribe({
        next: async (res) => {
          let userlist = await res;
          var index = userlist.map(function (e) { return e.email; }).indexOf(email);
          this.profile = await userlist[index]
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => {
          return this.profile
        }
      })
  }

  async ngOnInit(): Promise<void> {
    this.isloggedIn = await this.loginService.isLoggedIn()
    this.LoggedInUserEmail = this.loginService.haveAccess()["email"]
    this.LoggedInUserRole = this.loginService.haveAccess()['role']
    if (this.LoggedInUserRole == 'admin') {
      await this.getProfile(this.LoggedInUserEmail, this.userService)
    }
    else if (this.LoggedInUserRole == 'evaluator') {
      await this.getProfile(this.LoggedInUserEmail, this.evaluatorsService)
    }
    else if (this.LoggedInUserRole == 'employee') {
      await this.getProfile(this.LoggedInUserEmail, this.employeeService)
    }
    // else {
    //   this.profile = null;
    // }
    console.log("SidenavComponent ngOnInit", this.isloggedIn);
  }

  setHeading(pageTitle: String) {
    this.setDocTitle.emit(pageTitle);
  }

  logout() {
    localStorage.removeItem('loginToken')
    this.router.navigate(['signin'])
    this.ngOnInit()
  }

}
