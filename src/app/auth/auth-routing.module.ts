import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './signin/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

    { path : 'signup', component: RegisterComponent},
    {path : 'signin', component: LoginComponent},
    {path : 'forget-password', component: ForgetPasswordComponent},
    {path : 'confirm-email', component: ConfirmEmailComponent},
    {path : 'confirm', component: ConfirmEmailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {  }
