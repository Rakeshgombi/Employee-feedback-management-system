import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService extends DataService {
  constructor(_http: HttpClient) {
    let tasklistUrl = "http://127.0.0.1:8000/ratings/";
    super(tasklistUrl, _http);
  }
}
