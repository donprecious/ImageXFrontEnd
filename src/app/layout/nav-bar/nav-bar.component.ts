import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { IAppState } from './../../redux/store';
import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  isSignedIn = false;
  isSignedIn$: Observable<boolean>;

  constructor(private store: Store<IAppState>, private authService: AuthService,
              private router: Router ) { }

  ngOnInit(): void {

      // this.isSignedIn$ = this.store.pipe(select('isSignedIn'));
      this.isSignedIn$ = this.authService.isLogin;
      console.log('is logged in object', this.isSignedIn$);
      console.log(this.isSignedIn);

  }

  logout() {
    localStorage.clear();
    this.authService.isLogin.next(false);
    this.router.navigate(['/']);
  }


}
