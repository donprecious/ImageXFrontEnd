import { SIGNEDIN } from './../../redux/actions';
import { IAppState } from './../../redux/store';
import { ToastrService } from './../../services/toastr.service';
import { SignInModel } from './../signin-model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

declare var UIkit: any;
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
  constructor(private authService: AuthService, private fb: FormBuilder,
              private toast: ToastrService, private store: Store<IAppState>
    ) { }


  get f() {return this.loginForm.controls; }

  ngOnInit(): void {
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

      this.authService.signIn(data).subscribe(a => {
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

}
