import { RegisterComponent } from './signin/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
   { path : 'signup', component: RegisterComponent},
    {path : 'signin', component: LoginComponent},
  //   component: SiteLayoutComponent,
  //   children: [
  //        {path: '', component: IndexComponent},
  //        {path: 'home', component: IndexComponent},
  //        {path: 'index', component: IndexComponent},
  //        {path: '**', component: PageNotFoundComponent},

  //   ]

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
