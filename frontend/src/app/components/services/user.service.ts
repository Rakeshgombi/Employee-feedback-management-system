import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(_http: HttpClient) {
    let usersUrl = "http://127.0.0.1:8000/users/";
    super(usersUrl, _http)
  }
}
