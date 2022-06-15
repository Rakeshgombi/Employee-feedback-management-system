import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../services/dashboard.service';
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
  constructor(private service: DashboardService) { }

  ngOnInit(): void {
    this.service.getDepartments()
      .subscribe({
        next: (v) => {
          this.departments = Object.keys(v).length;
          console.log(this.departments);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete')
      })

    this.service.getDesignations()
      .subscribe({
        next: (v) => {
          this.designations = Object.keys(v).length;
          console.log(this.designations);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete')
      })
      
    this.service.getUsers()
      .subscribe({
        next: (v) => {
          this.users = Object.keys(v).length;
          console.log(this.users);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete')
      })
      
    this.service.getEmployees()
      .subscribe({
        next: (v) => {
          this.employees = Object.keys(v).length;
          console.log(this.employees);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete')
      })

    this.service.getEvaluators()
      .subscribe({
        next: (v) => {
          this.evaluators = Object.keys(v).length;
          console.log(this.evaluators);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete')
      })

    this.service.getTasklist()
      .subscribe({
        next: (v) => {
          this.tasklist = Object.keys(v).length;
          console.log(this.tasklist);
        },
        error: (e) => console.log(e),
        complete: () => console.log('Complete')
      })


  }

}
