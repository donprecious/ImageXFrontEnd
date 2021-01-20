import { ITag } from './../models/IImageModels';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiAppUrlService } from './api-app-url.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

constructor(private api: ApiAppUrlService, private http: HttpClient) { }

getAll(): Observable<ITag[]> {
  return this.http.get<ITag[]>(this.api.baseApiUrl + 'Image/GetTags');
}
}
