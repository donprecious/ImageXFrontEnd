import { MyUploadsComponent } from './image/myUploads/myUploads.component';
import { ImageComponent } from './image/image.component';
import { AuthModule } from './../auth/auth.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SiteLayoutComponent } from '../layout/site-layout/site-layout.component';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavBarComponent } from '../layout/nav-bar/nav-bar.component';
import { ImageGridComponent } from '../image-grid/image-grid.component';
import { ImageListComponent } from './image/image-list/image-list.component';
import { ImageCardComponent } from './image/image-card/image-card.component';
import { UploadFileComponent } from './upload-file/upload-file.component';


@NgModule({
  declarations: [
    SiteLayoutComponent,

     IndexComponent,
      PageNotFoundComponent,
       NavBarComponent,
       ImageGridComponent,
       ImageListComponent,
       ImageCardComponent,
       ImageComponent,
       UploadFileComponent,
       MyUploadsComponent
      ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    AuthModule
  ],
  exports: [
  ]
})
export class HomeModule { }
