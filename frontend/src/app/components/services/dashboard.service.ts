import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private departmentsUrl = "http://127.0.0.1:8000/departments";
  private designationsUrl = "http://127.0.0.1:8000/designations";
  private usersUrl = "http://127.0.0.1:8000/users";
  private employeesUrl = " http://127.0.0.1:8000/employees";
  private evaluatorsUrl = "http://127.0.0.1:8000/evaluators";
  private tasklistUrl = "http://127.0.0.1:8000/tasklist";
  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get(this.departmentsUrl);
  }
  getDesignations() {
    return this.http.get(this.designationsUrl);
  }
  getUsers() {
    return this.http.get(this.usersUrl);
  }
  getEmployees() {
    return this.http.get(this.employeesUrl);
  }
  getEvaluators() {
    return this.http.get(this.evaluatorsUrl);
  }
  getTasklist() {
    return this.http.get(this.tasklistUrl);
  }
}
