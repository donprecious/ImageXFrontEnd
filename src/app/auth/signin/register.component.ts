import { RegisterModel } from './../register-model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/control-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hasError = false;
  errors : any[];
  errorMessage : string;
  constructor(private authService: AuthService, private fb: FormBuilder) {

  }
    registerForm: FormGroup;

  ngOnInit(): void {
    this.hasError = false;
    this.errors =[] ;
    this.errorMessage ='';

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
      }, err => {

        console.log('error', err);
        if (err.Errors != null || err.Errors != undefined){
          if (err.error.error.validationErrors !== null) {
           for (const i of  err.Errors) {
            this.errors.push(i.ErrorMessage);
           }
          }
        }

      });
  }

}
