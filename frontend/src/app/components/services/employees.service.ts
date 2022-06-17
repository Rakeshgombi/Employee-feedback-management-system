import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import "rxjs/add/operators/catch";
// import "rxjs/add//catch";
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class employeesService {
  private employeesUrl = "http://127.0.0.1:8000/employees/";
  constructor(private _http: HttpClient) { }

  getEmployeeNameById(id: number): Observable<any> {
    return this._http.get(this.employeesUrl + id).pipe(
      catchError((error: Response) => {
        if (error.status === 404) {
          return throwError(() => new NotFoundError());
        }
        return throwError(() => new AppError(error))
      })
    )
  }
}

