import { RegisterResponseModel, RegisterModel } from './../auth/register-model';
import { SignInModel, SiginResponseModel } from './../auth/signin-model';
import { ApiAppUrlService } from './api-app-url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IAuth {
  isLoggedId: boolean;
  token: string;
  userId: string;
  profileUrl: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiAppUrlService, private http: HttpClient) {
   }

   public signIn(signInModel: SignInModel): Observable<SiginResponseModel> {
    return this.http.post<SiginResponseModel>(this.api.baseApiUrl+ 'Auth/Login', signInModel);
   }

   public register(registerModel: RegisterModel): Observable<RegisterResponseModel> {
     return this.http.post<RegisterResponseModel>(this.api.baseApiUrl + 'Auth/Register', registerModel );
   }



}
