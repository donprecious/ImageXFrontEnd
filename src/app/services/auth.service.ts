import { IResponseModel } from './../shared/models/IResponseModel';
import { IForgetModel } from './../auth/auth-model';
import { RegisterResponseModel, RegisterModel } from './../auth/register-model';
import { SignInModel, SiginResponseModel, ISignIn } from './../auth/signin-model';
import { ApiAppUrlService } from './api-app-url.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../models/IUserModel';

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

  public isLogin:  BehaviorSubject<boolean>;
  constructor(private api: ApiAppUrlService, private http: HttpClient) {

      const userData = this.GetSignInData();
      console.log('user Data', userData);
      if(userData != null){
          this.isLogin = new BehaviorSubject<boolean>(true);
      }else{
        this.isLogin = new BehaviorSubject<boolean>(false);

      }

   }

   public signIn(signInModel: SignInModel): Observable<SiginResponseModel> {
    return this.http.post<SiginResponseModel>(this.api.baseApiUrl+ 'Auth/Login', signInModel);
   }

   public register(registerModel: RegisterModel): Observable<RegisterResponseModel> {
     return this.http.post<RegisterResponseModel>(this.api.baseApiUrl + 'Auth/Register', registerModel );
   }

   public getCurrentUser() : Observable<IUser> {
     return this.http.get<IUser>(this.api.baseApiUrl + 'Auth/GetCurrentUser');
   }

   public GoogleSignIn(token): Observable<SiginResponseModel> {
     return this.http.post<SiginResponseModel>(this.api.baseApiUrl+ 'Auth/GoogleAuth', { 'idToken': token});
   }

  public SendForgetPassword( forget: IForgetModel): Observable<IResponseModel> {
    return this.http.post<IResponseModel>(this.api.baseApiUrl + 'Auth/ForgotPassword/forgot', forget);
  }
  public SendConfirmationEmail(email: string): Observable<IResponseModel> {
    return this.http.get<IResponseModel>(this.api.baseApiUrl +"Auth/ResendConfirmationEmail/resend-confirmation?email="+ email);
  }

  public ConfirmEmail(email: string, token: string): Observable<IResponseModel>{
    return this.http.get<IResponseModel>(this.api.baseApiUrl+`Auth/ConfirmEmail/confirm?userId=${email}&token=${token}`);
  }

  public SetAuthLocalStorage(a: SiginResponseModel){
    localStorage.setItem('token', a.data.auth_token);
    localStorage.setItem('userId', a.data.user.id);
    localStorage.setItem('user', JSON.stringify(a.data.user));
    localStorage.setItem('role', JSON.stringify(a.data.roles));
    localStorage.setItem('siginResponse', JSON.stringify(a.data));
  }
  public Logout(){
    localStorage.clear();
    this.isLogin.next(false);
  }
  public GetSignInData(): ISignIn{
    const datastr = localStorage.getItem('siginResponse');
    const data = JSON.parse(datastr) as ISignIn;
    return data;
  }


}
