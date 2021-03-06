import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faBuilding, faEnvelope, faIdCard, faLock, faUnlock, faUser, faUserCheck, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from '../common/app-error';
import { BadRequestError } from '../common/bad-request-error';
import { PasswordValidator } from '../common/validators/password.validator';
import { DepartmentsService } from '../services/departments.service';
import { EmployeesService } from '../services/employees.service';
import { EvaluatorsService } from '../services/evaluators.service';
import { UserService } from '../services/user.service';
import { ProfileModel } from './profile.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faUser = faUser
  faEnvelope = faEnvelope
  faUserGear = faUserGear
  faBuilding = faBuilding
  faIdCard = faIdCard
  faUserCheck = faUserCheck
  faLock = faLock;
  faUnlock = faUnlock
  user: any;
  role: string;
  department: any;
  evaluator: any;
  profileModelObject: ProfileModel = new ProfileModel();

  passwordChange = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, [PasswordValidator.MatchValidator('password', 'confirmPassword')])


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private evaluatorService: EvaluatorsService,
    private employeeService: EmployeesService,
    private departmentService: DepartmentsService,
  ) { }


  get password() {
    return this.passwordChange.get('password');
  }
  get confirmPassword() {
    return this.passwordChange.get('confirmPassword');
  }
  get passwordMatchError() {
    return (
      this.passwordChange.getError('mismatch') &&
      this.passwordChange.get('confirmPassword')?.touched
    );
  }

  getDepartment(id: number) {
    this.departmentService.getById(id)
      .subscribe({
        next: (res) => {
          this.department = res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => {
          console.log("Complete");
        }
      })
  }
  getEvaluator(id: number) {
    this.evaluatorService.getById(id)
      .subscribe({
        next: (res) => {
          this.evaluator = res;
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => {
          console.log("Complete");
        }
      })
  }

  getUser(id: number, service: any) {
    service.getById(id)
      .subscribe({
        next: async (res) => {
          this.user = await res;
          if (this.role === "employee") {
            this.getDepartment(parseInt(this.user.department_id))
            this.getEvaluator(parseInt(this.user.evaluator_id))
          }
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => {
          console.log("Complete");
        }
      })
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!
    this.role = this.route.snapshot.paramMap.get('role')!
    if (this.role == "admin") {
      this.getUser(parseInt(id), this.userService)
      // console.log(this.user);
    }
    else if (this.role == "evaluator") {
      this.user = this.getUser(parseInt(id), this.evaluatorService)
    }
    else if (this.role == "employee") {
      this.user = this.getUser(parseInt(id), this.employeeService)
    }
  }

updateProfile(service:any, modelObject:any){
  service.update(modelObject.id, modelObject)
  .subscribe({
    next: (res) => {
      console.log(res);
      alert("Profile Updated successfully");
    },
    error: (e: AppError) => {
      if (e instanceof NotFoundError) {
        alert("User Not found");
      } else if (e instanceof BadRequestError) {
        alert("Bad request");
      }
      else throw e;
    },
    complete: () => {
      console.log('Complete')
      this.passwordChange.reset();
      this.ngOnInit()
    }
  })
}

  changePassword() {
    this.profileModelObject.id = this.user.id
    this.profileModelObject.password = this.passwordChange.value.password
    console.log(this.profileModelObject);
    if (this.role == "admin") {
      this.updateProfile(this.userService, this.profileModelObject)
    }
    else if (this.role == "evaluator") {
      this.updateProfile(this.evaluatorService, this.profileModelObject)
    }
    else if (this.role == "employee") {
      this.updateProfile(this.employeeService, this.profileModelObject)
    }
  }
}
