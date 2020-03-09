import { ToastrService } from './../../services/toastr.service';
import { SignInModel } from './../signin-model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService, private fb: FormBuilder,  private toast: ToastrService) { }


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
        localStorage.setItem('token', a.auth_token);
        localStorage.setItem('userId', a.id);
        this.toast.success('login successful', 'notification');

          // do other login stuff
        const currentUrl = location.href;
        UIkit.modal('#modal-auth').hide();
        // close the modal
        //
        console.log(a);

       }, err => {

        console.log('error', err);
        if (err.login_failure != null || err.login_failure !== undefined) {
         for (const i of  err.login_failure ) {
          this.errors.push(i.message);
         }
      }

      });

  }

}
