import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [SiteLayoutComponent, IndexComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SiteLayoutComponent
  ]
})
export class HomeModule { }
