import { ToastrService } from 'src/app/services/toastr.service';
import { ApiAppUrlService } from './../services/api-app-url.service';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
declare var UIkit: any;
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor( private toast: ToastrService ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error);

        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
              console.error("Error Event");
          } else {
              console.log(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                  case 401:

                      // this.router.navigateByUrl("/login");
                       this.toast.info('please login to continue');
                       UIkit.modal('#modal-auth').show();
                       break;

                  case 403:     //forbidden
                      this.toast.info('Your are not authorize to access this content');
                      break;
              }
          }
      } else {
          console.error("some thing else happened");
      }
        return throwError(error.message);
      })
    );
  }
  // handleError(error: HttpErrorResponse){
  //   console.log("lalalalalalalala");
  //   return throwError(error);
  //  }
  // intercept(req: HttpRequest<any>, next: HttpHandler):
  //   Observable<HttpEvent<any>> {
  //     const token: string = localStorage.getItem('token');
  //     let authReq = req.clone();
  //     const searchIndex = authReq.url.search(this.api.baseApiUrl);
  //     if(searchIndex >= 0) {
  //       if (token) {
  //         authReq = req.clone({
  //            headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
  //          });
  //        }

  //     }

  //     console.log('request cloned', authReq);
  //     return next.handle(authReq);
  // }

}
