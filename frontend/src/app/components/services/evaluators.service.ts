import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class EvaluatorsService extends DataService {
  constructor(_http: HttpClient) {
    let evaluatorsUrl = `${baseUrl}evaluators/`;
    super(evaluatorsUrl, _http);
  }
}

