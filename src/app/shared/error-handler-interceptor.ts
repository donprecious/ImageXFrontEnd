import { ErrorService } from './../services/error.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { ApiAppUrlService } from './../services/api-app-url.service';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
declare var UIkit: any;
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor( private toast: ToastrService, private errorService: ErrorService ) {

  }
  message = "";
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
                      this.toast.info('You are not authorize to access this content');
                      break;
                  default:
                    if(!navigator.onLine){
                      this.message = this.errorService.getServerErrorMessage(error);
                      this.toast.error("no internet connection");
                      break;
                    }


              }
          }
      } else {
        //client side error
          console.error("some thing else happened", error);
          this.message = this.errorService.getClientErrorMessage(error);
          this.toast.error(this.message);
      }
        return throwError(error);
      })
    );
  }


}
