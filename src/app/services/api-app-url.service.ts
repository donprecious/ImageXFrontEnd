import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiAppUrlService {

  public baseApiUrl = environment.baseApiUrl;
  constructor() {  }
}
