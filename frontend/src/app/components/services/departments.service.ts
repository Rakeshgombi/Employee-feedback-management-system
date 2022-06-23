import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends DataService {

  constructor(_http: HttpClient) { 
    super("http://127.0.0.1:8000/departments/", _http)
  }
}
