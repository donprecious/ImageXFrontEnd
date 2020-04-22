import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  isSignedIn = false;
  isSignedIn$: Observable<boolean>;

  constructor(private authService: AuthService,
              private router: Router ) { }

  ngOnInit(): void {

      // this.isSignedIn$ = this.store.pipe(select('isSignedIn'));


      this.isSignedIn$ = this.authService.isLogin;
      console.log('is logged in object', this.isSignedIn$);
      console.log(this.isSignedIn);
  }

   ngDoCheck() {

    this.isSignedIn$ = this.authService.isLogin;
    console.log('is logged in object change detected', this.isSignedIn$);
    console.log("is login value change detected", this.isSignedIn);
  }

  logout() {
    this.authService.Logout();
    this.router.navigate(['/']);
  }




}
