import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor( private authService: AuthService ) { }
  message = '';
  success = false;
  isSubmited = false;
  loading = false;
  ngOnInit(): void {

  }

  resendConfimation(){
    const email = "";

    this.authService.SendConfirmationEmail(email).subscribe(a => {
      this.isSubmited = true;
      this.message = "success: email confimation has been sent to "+ email;
      this.success = true;
    });

  }
}
