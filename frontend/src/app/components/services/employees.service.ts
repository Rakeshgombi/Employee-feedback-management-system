import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class employeesService {
  private employeesUrl = "http://127.0.0.1:8000/employees/";
  constructor(private http: HttpClient) { }

  getEmployeeNameById(id: number) {
    return this.http.get(this.employeesUrl + id);
  }
}
