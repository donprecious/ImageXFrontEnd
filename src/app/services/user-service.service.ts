import { Observable } from 'rxjs';
import { ApiAppUrlService } from './api-app-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface ICurrentLoginUser {
	userName: string;
	name: string;
	surname: string;
	emailAddress: string;
	isActive: boolean;
	fullName: string;
	profilePicture?: any;
	lastLoginTime?: any;
	creationTime: string;
	roleNames?: any;
	id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
ApiAppUrlService: any;

constructor(private http: HttpClient, private api: ApiAppUrlService) { }


/**
 * getCurrentUserInfo
 */

public getCurrentUserInfo(): Observable<ICurrentLoginUser> {
 // const token = localStorage.getItem('token');
  return this.http.get<ICurrentLoginUser>(`${this.ApiAppUrlService}/Session/GetLoginUser`);
}

}
