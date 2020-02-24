import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const route: Routes = [
  // { path: '',   redirectTo: 'home', pathMatch: 'full' },



];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(route, { enableTracing: true }),

    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
