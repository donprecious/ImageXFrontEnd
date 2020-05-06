import { IResponseModel } from './../shared/models/IResponseModel';
import { IImageModel, ICreateImageModel, IContentCollection, ILike, IImageGeoInfo, IGeoJson, ILikeToggleResponse } from './../models/IImageModels';
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
 public get(id): Observable<IImageModel>{
   return  this.http.get<IImageModel>(this.api.baseApiUrl + 'Image/Get/' + id);
 }
 public create(images: ICreateImageModel[]): Observable<IImageModel> {
  return this.http.post<IImageModel>( this.api.baseApiUrl + 'Image/Create',  images);
 }
 public deleteImage(id: number): Observable<IResponseModel> {
  return this.http.delete<IResponseModel>(this.api.baseApiUrl + 'image/delete/' + id);
}
 public createCollection(collection: IContentCollection): Observable<IContentCollection> {
    return this.http.post<IContentCollection>(this.api.baseApiUrl + 'Image/CreateCollection', collection);
 }
 public deleteCollection(id: number) : Observable<IResponseModel> {
   return this.http.delete<IResponseModel>(this.api.baseApiUrl + 'image/deleteCollection/' + id);
 }

 public createLike(collection: ILike): Observable<ILikeToggleResponse> {
    return this.http.post<ILikeToggleResponse>(this.api.baseApiUrl + 'Image/LikeToggle', collection);
 }
 public getAllImageGeoInfo() : Observable<IGeoJson>{
   return this.http.get<IGeoJson>(this.api.baseApiUrl+"image/GetAllImageGeoJSON")
 }
 public getImageGeoJsonUrl() { return this.api.baseApiUrl+"image/GetAllImageGeoJSON" }

 public countViews(id){
   return  this.http.get(this.api.baseApiUrl+'image/countViews/'+id);
 }
 public countLiks(id){
  return  this.http.get(this.api.baseApiUrl+'image/countLikes/'+id);
}
public countContributorViews(id){
  return  this.http.get(this.api.baseApiUrl+'image/CountContributorsViews/'+id);
}
public getCollection(): Observable<IImageModel[]> {
  return  this.http.get<IImageModel[]>(this.api.baseApiUrl + 'image/GetCollections');
}

public getMyUploads(): Observable<IImageModel[]> {
  return  this.http.get<IImageModel[]>(this.api.baseApiUrl + 'image/GetMyUploads');
}
}
