import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-PasswordReset',
  templateUrl: './PasswordReset.component.html',
  styleUrls: ['./PasswordReset.component.css']
})
export class PasswordResetComponent implements OnInit {
  ResetPasswordForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.ResetPasswordForm = new FormGroup({
      'new password': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]})
    })
  
  }

  reset() {

  }


}
