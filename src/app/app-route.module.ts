import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const route: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  declarations: [],
  imports: [
    route,
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouteModule { }
