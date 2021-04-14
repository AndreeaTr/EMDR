import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  isClicked: boolean;
  resetError: string;
  resetForm: FormGroup;
  successMsg: String;

  constructor(private http: HttpClient) { }

  get email(){return this.resetForm.get('email')}

  ngOnInit() {
    this.resetForm = new FormGroup({
      'email': new FormControl('', {validators: [Validators.required, Validators.email]}),
    })
  
  }

  reset() {
    if(this.resetForm.valid)
    {
      this.isClicked = true;

      let email = this.email.value;

      const headers = { 'Content-Type':  'application/json'};
      
      const body = { email: email };


      this.http.post('https://emdr-back-end.herokuapp.com/ForgotPassword', body, { 'headers': headers, 'observe': 'response' })
      .subscribe(

        responseBody =>
          {
            this.successMsg = "Password reset link has been sent successfully. Please check your inbox!"

          },

        err => //Intercepting forbidden status
          {
            console.log(err);
          }

        )
     }
      else {
        if(this.email.invalid)
        {
          this.resetError = "Please enter a valid email address!";
        }
        else 
        {
          this.resetError = "Field must be completed";
        }
        
      }

  }

}
