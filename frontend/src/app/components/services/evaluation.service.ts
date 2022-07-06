import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService extends DataService {
  constructor(_http: HttpClient) {
    let tasklistUrl = `${baseUrl}ratings/`;
    super(tasklistUrl, _http);
  }
}
