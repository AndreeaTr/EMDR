import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-PasswordReset',
  templateUrl: './PasswordReset.component.html',
  styleUrls: ['./PasswordReset.component.css']
})
export class PasswordResetComponent implements OnInit {
  ResetPasswordForm: FormGroup;
  isClicked: boolean;
  successMsg: string;
  passError: string;
  tkn: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.ResetPasswordForm = new FormGroup({
      'newPassword': new FormControl('', {validators: [Validators.required]}),
      'confPassword': new FormControl('', {validators: [Validators.required]})
    })
  
    this.route.params.subscribe((token)=>
      {
        console.log(token['token']);
        this.tkn = token['token'];
      }
    )

  }

  get newPassword(){return this.ResetPasswordForm.get('newPassword')}
  get confPassword(){return this.ResetPasswordForm.get('confPassword')}

  reset() {
    if(this.ResetPasswordForm.valid)
    {
      this.isClicked = true;

      let newPassword = this.newPassword.value;
      let confPassword = this.confPassword.value;

      const headers = { 'Content-Type':  'application/json'};
      
      const body = { password: newPassword};


      if(newPassword == confPassword)
      {
        this.passError = "";
        this.http.put('https://emdr-back-end.herokuapp.com/reset_password/' + this.tkn , body, { 'headers': headers, 'observe': 'response' })
        .subscribe(

          responseBody =>
            {
              this.successMsg = "Your Password has been reset successfully"
            },

          err => //Intercepting forbidden status
            {
              console.log(err);
            }

          )
        }
        else
        {
          this.passError = "Passwords don't match";
        }
      }

        else {
          if(this.newPassword.invalid || this.confPassword.invalid) 
          {
            this.passError = "All fields must be completed";
          }
          
      }

  }


}
