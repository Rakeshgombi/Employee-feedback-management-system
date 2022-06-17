import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class EvaluatorsService extends DataService {
  constructor(_http: HttpClient) {
    let evaluatorsUrl = "http://127.0.0.1:8000/evaluators/";
    super(evaluatorsUrl, _http);
  }
}

