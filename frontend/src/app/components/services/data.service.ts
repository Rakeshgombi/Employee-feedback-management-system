import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(@Inject(String) private url: string, private _http: HttpClient) { }

  getAll(): Observable<any> {
    return this._http.get(this.url).pipe(
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<any> {
    return this._http.get(this.url + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(() => new NotFoundError());
    }
    return throwError(() => new AppError(error));
  }
}

