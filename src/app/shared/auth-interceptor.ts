import { ApiAppUrlService } from './../services/api-app-url.service';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private api: ApiAppUrlService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      const token: string = localStorage.getItem('token');
      let authReq = req.clone();
      const searchIndex = authReq.url.search(this.api.baseApiUrl);
      if(searchIndex >= 0) {
        if (token) {
          authReq = req.clone({
             headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
           });
         }

      }

      console.log('request cloned', authReq);
      return next.handle(authReq);
  }
}
