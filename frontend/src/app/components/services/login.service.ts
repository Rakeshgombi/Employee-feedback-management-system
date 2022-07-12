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
    let tokenExists = localStorage.getItem('loginToken') != null;
    if (tokenExists) {
      return true
    } else {
      return false
    }
  }

  getToken() {
    localStorage.getItem('loginToken') || '';
  }

  haveAccess(): String {
    var logginToken = localStorage.getItem('loginToken') || '';
    if (logginToken) {
      var _extractedToken = logginToken.split('.')[1];
      var _atobData = atob(_extractedToken);
      var _finalData = JSON.parse(_atobData);
    }
    return _finalData? _finalData : ''
  }
}
