import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends DataService {
  constructor(_http: HttpClient) {
    let tasklistUrl = `${baseUrl}login/`;
    super(tasklistUrl, _http);
  }
  isLoggedIn() {
    return localStorage.getItem('loginToken') != null;
  }

  getToken() {
    localStorage.getItem('loginToken') || '';
  }

  haveAccess(): String {
    var logginToken = localStorage.getItem('loginToken') || '';
    var _extractedToken = logginToken.split('.')[1];
    var _atobData = atob(_extractedToken);
    var _finalData = JSON.parse(_atobData);
    console.log(_finalData);
    return _finalData.role
  }
}
