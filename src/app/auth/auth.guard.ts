import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
declare var UIkit: any;
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService,   private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLogin = false;
      this.authService.isLogin.subscribe( a => {
        isLogin = a;
        if(a === false ) {
          UIkit.modal('#modal-auth').show();
        }
      });
      if(isLogin){
        const loginData = this.authService.GetSignInData();
        if (!loginData.canLogin) {
              this.router.navigate(['/confirm-email']);
              return false;
         }
      }

      return isLogin;
  }

}
