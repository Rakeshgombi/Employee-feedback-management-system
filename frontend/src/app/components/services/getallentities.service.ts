import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class GetAllEntitiesService {
  private departmentsUrl = "http://127.0.0.1:8000/departments";
  private designationsUrl = "http://127.0.0.1:8000/designations";
  private usersUrl = "http://127.0.0.1:8000/users";
  private employeesUrl = " http://127.0.0.1:8000/employees";
  private evaluatorsUrl = "http://127.0.0.1:8000/evaluators";
  private tasklistUrl = "http://127.0.0.1:8000/tasklist";

  constructor(private _http: HttpClient) { }

  getDepartments() {
    return this._http.get(this.departmentsUrl).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }

  getDesignations() {
    return this._http.get(this.designationsUrl).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }

  getUsers() {
    return this._http.get(this.usersUrl).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }

  getEmployees() {
    return this._http.get(this.employeesUrl).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }

  getEvaluators() {
    return this._http.get(this.evaluatorsUrl).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }

  getTasklist() {
    return this._http.get(this.tasklistUrl).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }
}
