import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { SiteLayoutComponent } from './../layout/site-layout/site-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path : '',
    component: SiteLayoutComponent,
    children: [
         {path: '', component: IndexComponent},

         {path: 'home', component: IndexComponent},
         {path: 'index', component: IndexComponent},
         {path: '**', component: PageNotFoundComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
