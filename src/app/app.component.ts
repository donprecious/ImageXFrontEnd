import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'image-africa';

  constructor(private auth: AuthService) {
    console.log("version", "version 1.0 runing");
  }

  ngOnInit(): void {

     const token = localStorage.getItem('token');
     if (token) {
      this.auth.isLogin.next(true);
    }
  }
}

