import { ActivatedRoute, Router } from '@angular/router';
import { ISignIn } from './../signin-model';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  message = 'hello, you need to confirm your email address, please check mail and proceed from their';
  success = false;
  isSubmited = false;
  loading = false;
  userData: ISignIn;
  constructor( private authService: AuthService, private route: ActivatedRoute, private router : Router ) {
    this.userData = this.authService.GetSignInData();

   }


  ngOnInit(): void {
   const email =   this.route.snapshot.queryParamMap.get('userId');
   const token =   this.route.snapshot.queryParamMap.get('token');
   if(email != null || token != null ){
    this.isSubmited = true;
    this.authService.ConfirmEmail(email, token).subscribe( a=> {
          this.message = "Success Your Account is confirmed, Please Login";
          this.authService.Logout();
          if(a.status == 'success') { this.success = true; }
       }, err=> {
          this.success = false;
          this.message = 'Link must have expired and no longer valid, Resend a new link';
       });
    }
  }

  resendConfimation(){
    const email = this.userData.user.email;
    this.isSubmited = true;
    this.success = true;
    this.authService.SendConfirmationEmail(email).subscribe(a => {
      console.log(a);
      if(a.status == 'success') {
        this.message = "success: email confimation has been sent to "+ email;

      } else {
        this.message = a.message;
      }

    });

  }

  logout(){
    this.authService.Logout();
    this.router.navigate(['/']);
  }
}
