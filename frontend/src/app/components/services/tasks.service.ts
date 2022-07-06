import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService extends DataService {
  constructor(_http: HttpClient) {
    let tasklistUrl = `${baseUrl}tasklist/`;
    super(tasklistUrl, _http);
  }
}

