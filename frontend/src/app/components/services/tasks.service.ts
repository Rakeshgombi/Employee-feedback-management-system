import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class TasksService extends DataService {
  constructor(_http: HttpClient) {
    let tasklistUrl = "http://127.0.0.1:8000/tasklist/";
    super(tasklistUrl, _http);
  }
}

