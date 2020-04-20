import { ToastrService } from 'src/app/services/toastr.service';
import { SignInModel } from './../signin-model';
import { RegisterModel } from './../register-model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/control-validators';
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
              private toast: ToastrService
     ) {

 }
    registerForm: FormGroup;

  ngOnInit(): void {
    this.hasError = false;
    this.errors = [] ;
    this.errorMessage = '';
    if( typeof gapi == 'undefined') {
      location.reload();
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
        console.log(d);
        // login the user here
        this.login({email: data.email, password: data.password }as SignInModel);



      }, err => {

        console.log('error', err);
        if (err.error != null || err.error != undefined) {
            // tslint:disable-next-line: forin
            if (typeof err.error !== 'string') {
              for (let ikey in err.error) {
                if (err.error.hasOwnProperty(ikey)) {
                  for (const i of err.error[ikey]) {
                    this.errors.push(i);
                    // console.log('key loop property", ...err.error[ikey] );
                  }

                }

              }
            }
          // if (err.error.error.validationErrors !== null) {
          //  for (const i of  err.Errors) {
          //   this.errors.push(i.ErrorMessage);
          //  }
          // }
        }

      });
  }

  login(signInModel: SignInModel) {

    this.authService.signIn(signInModel).subscribe(a => {
      console.log(a);
      localStorage.setItem('token', a.auth_token);
      localStorage.setItem('userId', a.id);
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

     },
      err => {
      console.log('error', err);
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
     console.log('current user' , currentUser);
     const token = auth.id_token;
     this.authService.GoogleSignIn(token).subscribe(a=> {
       console.log(a);
       localStorage.setItem('token', a.auth_token);
       localStorage.setItem('userId', a.id);
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
     });
   });
 }

}
