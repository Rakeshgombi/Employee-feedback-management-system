import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { DepartmentsService } from '../services/departments.service';
import { DesignationsService } from '../services/designations.service';
import { UsersService } from '../services/users.service';
import { EmployeesService } from '../services/employees.service';
import { EvaluatorsService } from '../services/evaluators.service';
import { TasksService } from '../services/tasks.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  departments;
  designations;
  users;
  employees;
  evaluators;
  tasklist;
  constructor(private departmentsService: DepartmentsService, private designationsService: DesignationsService, private usersService: UsersService, private employeesService: EmployeesService, private evaluatorsService: EvaluatorsService, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.departmentsService.getAll()
      .subscribe({
        next: (v) => {
          this.departments = Object.keys(v).length;
          console.log("Department => ", this.departments);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })

    this.designationsService.getAll()
      .subscribe({
        next: (v) => {
          this.designations = Object.keys(v).length;
          console.log(this.designations);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })

    this.usersService.getAll()
      .subscribe({
        next: (v) => {
          this.users = Object.keys(v).length;
          console.log(this.users);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })

    this.employeesService.getAll()
      .subscribe({
        next: (v) => {
          this.employees = Object.keys(v).length;
          console.log(this.employees);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })

    this.evaluatorsService.getAll()
      .subscribe({
        next: (v) => {
          this.evaluators = Object.keys(v).length;
          console.log(this.evaluators);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })

    this.tasksService.getAll()
      .subscribe({
        next: (v) => {
          this.tasklist = Object.keys(v).length;
          console.log(this.tasklist);
        },
        error: (e: AppError) => {
          if (e instanceof NotFoundError) {
            alert("Not found");
          } else throw e;
        },
        complete: () => console.log('Complete')
      })
  }

}
