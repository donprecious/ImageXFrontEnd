import { IImageModel, ICreateImageModel } from './../models/IImageModels';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiAppUrlService } from './api-app-url.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

constructor(private http: HttpClient, private api: ApiAppUrlService) { }

public getAllImages(): Observable<IImageModel[]> {
  return this.http.get<IImageModel[]>(this.api.baseApiUrl + 'Image/GetAll');
 }

 public create(images: ICreateImageModel[]): Observable<IImageModel>{

  return this.http.post<IImageModel>(this.api.baseApiUrl+'Image/Create',  images);
 }
}
