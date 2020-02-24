import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [SiteLayoutComponent, IndexComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,

  ],
  exports: [
  ]
})
export class HomeModule { }
