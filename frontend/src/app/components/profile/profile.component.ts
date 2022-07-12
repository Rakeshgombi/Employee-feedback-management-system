import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBuilding, faEnvelope, faIdCard, faUser, faUserCheck, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { NotFoundError } from 'rxjs/internal/util/NotFoundError';
import { AppError } from '../common/app-error';
import { DepartmentsService } from '../services/departments.service';
import { EmployeesService } from '../services/employees.service';
import { EvaluatorsService } from '../services/evaluators.service';
import { UserService } from '../services/user.service';

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
  user: any;
  role: string;
  department: any;
  evaluator: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private evaluatorService: EvaluatorsService,
    private employeeService: EmployeesService,
    private departmentService: DepartmentsService,
  ) { }


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
      console.log(this.user);
    }
    else if (this.role == "evaluator") {
      this.user = this.getUser(parseInt(id), this.evaluatorService)
    }
    else if (this.role == "employee") {
      this.user = this.getUser(parseInt(id), this.employeeService)
    }
  }

}
