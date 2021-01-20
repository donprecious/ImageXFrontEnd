import { Router } from '@angular/router';
import { ToastrService } from 'src/app/services/toastr.service';
import { SignInModel } from './../signin-model';
import { RegisterModel } from './../register-model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/control-validators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var UIkit: any;
declare var gapi: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasError = false;
  errors: any[];
  googleAuth: any;

  errorMessage: string;
  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private toast: ToastrService,
              private router: Router,
              private ngxService: NgxUiLoaderService
              
     ) {

 }
    registerForm: FormGroup;

  ngOnInit(): void {
    this.hasError = false;
    this.errors = [] ;
    this.errorMessage = '';
    if( typeof gapi == 'undefined') {
      let infoToast = this.toast ;
      infoToast.toastOptions.positionClass = "toast-top-center"; 
      infoToast.toastOptions.timeOut = '10000';
      infoToast.info("poor internet connection, <a onclick='location.reload()'>click here to refresh page</a>");

    }else{
      this.loadgoogleLogin();
    }
    this.registerForm =  this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
  }, {
    validators: MustMatch('password', 'confirmPassword')
  });
  // {validator: this.ctrlValidator.MustMatch('password', 'confirmPassword')});
  }

  get f() {return this.registerForm.controls; }

  submit(): void {
    this.errors = [];
    this.errorMessage = '';

    if (this.registerForm.invalid) {
        return;
    }

    const data: RegisterModel = {
        firstName : this.registerForm.get('fullname').value,
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        confirmPassword: this.registerForm.get('confirmPassword').value,
        profileImageUrl: ''
    } as RegisterModel;

    this.authService.register(data).subscribe(d => {
      this.ngxService.startLoader('loader-01');
        console.log(d);

        this.login({email: data.email, password: data.password }as SignInModel);

      }, err => {
        this.ngxService.stopLoader('loader-01');
        console.log('error', err);
        this.hasError = true;
        this.errors = err.error.message.split(',');


      });
  }

  login(signInModel: SignInModel) {
    this.ngxService.startLoader('loader-01');

    this.authService.signIn(signInModel).subscribe(a => {
      console.log(a);
      this.authService.SetAuthLocalStorage(a);
      this.toast.success('login successful', 'notification');
        // do other login stuff
      this.ngxService.stopLoader('loader-01');

      UIkit.modal('#modal-auth').hide();

      this.authService.isLogin.next(true);
      console.log('Is login observable', this.authService.isLogin);
      console.log(a);
      if(!a.data.canLogin){
        this.router.navigate(['/confirm-email']);
      }

     },
      err => {
      console.log('error', err);
      this.ngxService.stopLoader('loader-01');

      this.errors = [];
      if (err.error.login_failure != null || err.error.login_failure !== undefined) {
       for (const i of  err.error.login_failure ) {
        this.errors.push(i);
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
    this.googleAuth.signIn({
     scope: 'profile email',
     prompt: 'select_account'
   }).then((a) => {
     console.log(a);
     const currentUser = this.googleAuth.currentUser.get();
     const auth = currentUser.getAuthResponse();
     this.ngxService.startLoader('loader-01');
     console.log('current user' , currentUser);
     const token = auth.id_token;
     this.authService.GoogleSignIn(token).subscribe( a => {
       console.log(a);

       this.authService.SetAuthLocalStorage(a);
       this.toast.success('login successful', 'notification');
         // do other login stuff
       const currentUrl = location.href;
       UIkit.modal('#modal-auth').hide();
       // close the modal
       //
     //  this.store.dispatch(SIGNEDIN());
       this.authService.isLogin.next(true);
       console.log('Is login observable', this.authService.isLogin);
       console.log(a);
       this.ngxService.stopLoader('loader-01');
     })
   });
 }

}
