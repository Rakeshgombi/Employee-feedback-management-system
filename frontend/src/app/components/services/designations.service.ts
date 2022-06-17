import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class DesignationsService extends DataService {
  constructor(_http: HttpClient) {
    let designationsUrl = "http://127.0.0.1:8000/designations/";
    super(designationsUrl, _http)
  }
}
