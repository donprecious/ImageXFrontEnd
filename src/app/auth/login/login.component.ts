import { Router } from '@angular/router';
import { SIGNEDIN } from './../../redux/actions';
import { IAppState } from './../../redux/store';
import { ToastrService } from './../../services/toastr.service';
import { SignInModel } from './../signin-model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare var UIkit: any;
declare var gapi: any;

// facebook declarations
declare var FB: any;
declare var  statusChangeCallback: any;
// end of facebook decla
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hasError = false;
  errors: any[];
  errorMessage: string;
  loginForm: FormGroup;
  googleAuth: any;
  loading: false;
  constructor(private authService: AuthService, private fb: FormBuilder,
              private toast: ToastrService, private store: Store<IAppState>,
              private router: Router,
              private ngxService: NgxUiLoaderService
    ) {
    }


  get f() {return this.loginForm.controls; }

  ngOnInit(): void {
    if( typeof gapi == 'undefined') {
      let infoToast = this.toast ;
      infoToast.toastOptions.positionClass = "toast-top-center"; 
      infoToast.toastOptions.timeOut = '10000';
      infoToast.info("poor internet connection, <a onclick='location.reload()'>click here to refresh page</a>");

    }else{
      this.loadgoogleLogin();
    }

    this.hasError = false;
    this.errors = [] ;
    this.errorMessage = '';

    this.loginForm =  this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

  });
  }

      login(): void {
          const data: SignInModel = {
              email: this.loginForm.get('email').value,
              password: this.loginForm.get('password').value
          }as SignInModel;
          this.ngxService.startLoader('loader-01');

          this.authService.signIn(data).subscribe(a => {
            console.log(a);
            this.ngxService.stopLoader('loader-01');

            this.authService.SetAuthLocalStorage(a);
            this.toast.success('login successful', 'notification');
            UIkit.modal('#modal-auth').hide();

            if(!a.data.canLogin){
              this.router.navigate(['/confirm-email']);
            }
            this.authService.isLogin.next(true);
            console.log('Is login observable', this.authService.isLogin);
            console.log(a);

          },
            err => {
            console.log('error', err);
            this.errors = [];
            if (err.error.login_failure != null || err.error.login_failure !== undefined) {
            for (const i of  err.error.login_failure ) {
              this.errors.push(i);
              this.ngxService.stopLoader('loader-01');
            }
          }
          });

      }

  loadgoogleLogin() {
    gapi.load('auth2', () => {
      /* Ready. Make a call to gapi.auth2.init or some other API */
      this.googleAuth = gapi.auth2.init({
        client_id: '473446857855-9fmn8dnefe3b9mvm046sdq35echrss1l.apps.googleusercontent.com'
      });

    });
  }

  signInWithGoogle() {
     this.ngxService.startLoader('loader-01');
     this.googleAuth.signIn({
      scope: 'profile email',
      prompt: 'select_account'
    }).then((a) => {
      console.log(a);
      const currentUser = this.googleAuth.currentUser.get();
      const auth = currentUser.getAuthResponse();
      console.log('current user' , currentUser);
      const token = auth.id_token;
      this.authService.GoogleSignIn(token).subscribe(a=> {

        this.authService.SetAuthLocalStorage(a);
        this.toast.success('login successful', 'notification');



        UIkit.modal('#modal-auth').hide();

        this.ngxService.stopLoader('loader-01');
        this.authService.isLogin.next(true);
        console.log('Is login observable', this.authService.isLogin);
        location.reload();
      });
    });
  }

  siginWithFacebook(){
    this.ngxService.startLoader('loader-01');
    FB.login((response) => {
      // handle the response
      if(response.status === "connected"){
        this.authService
        .FacebookSignIn(response.authResponse.userID, response.authResponse.accessToken)
        .subscribe(a=> {
          this.authService.SetAuthLocalStorage(a);
          this.authService.isLogin.next(true);
          this.toast.success('login successful');
          this.ngxService.stopLoader('loader-01');
          location.reload();


        }, err => {
          console.log(err)
          this.toast.error(err.error.message);
          this.ngxService.stopLoader('loader-01');
        });
      } else {
        // cant login
        this.toast.error('cant login', 'notification');
        this.ngxService.stopLoader('loader-01');
      }
      console.log(response);
    },  {scope: 'email,public_profile'});
  }
}
