import { RegisterComponent } from './signin/register.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { AuthComponent } from './auth/auth.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ForgetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    AuthComponent

  ]
})
export class AuthModule { }
