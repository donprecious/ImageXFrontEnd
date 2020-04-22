import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
   }

   get f() {
     return this.form.controls;
   }

   submit() {
     console.log(this.form.value);
   }

  ngOnInit(): void {
  }

}
