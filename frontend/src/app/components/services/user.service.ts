import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(_http: HttpClient) {
    let usersUrl = `${baseUrl}users/`;
    super(usersUrl, _http)
  }
}
