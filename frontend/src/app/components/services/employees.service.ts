import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService extends DataService {
  constructor(_http: HttpClient) {
    super("http://127.0.0.1:8000/employees/", _http);
  }
}

