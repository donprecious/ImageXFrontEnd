import { Observable } from 'rxjs';
import { ApiAppUrlService } from './api-app-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/CategoryModels';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private api: ApiAppUrlService) { }

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.api.baseApiUrl+'category/getall');
  }
  get(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(this.api.baseApiUrl+'category/get/' + id);
  }
}
