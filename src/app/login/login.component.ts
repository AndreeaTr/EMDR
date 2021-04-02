import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) {}
  hide = true;
  loginError: string;
  isClicked: boolean;
  loginForm: FormGroup;


  ngOnInit() {
    this.loginError = "";
    this.isClicked = false;

    // REACTIVE-FORM
    this.loginForm = new FormGroup({
      'email': new FormControl('', {validators: [Validators.required, Validators.email]}),
      'password': new FormControl('', {validators: [Validators.required]})
    })
    //
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login()
  {
    if(this.loginForm.valid)
    {
      this.isClicked = true;

      let email = this.loginForm.value["email"];
      let password = this.loginForm.value["password"];

      const headers = { 'Content-Type':  'application/json', 'Authorization': 'Basic ' + btoa(email + ":" + password)};

      const body = {

      };


      console.log(body);

      this.http.post('https://emdr-back-end.herokuapp.com/login', body, { 'headers': headers, 'observe': 'response' })
        .subscribe(

          responseBody =>
            {
              const token = responseBody.body[0]["token"];
              sessionStorage.setItem('token', token);
              this.router.navigate(["/"]);
              console.log(responseBody);
            },

          err => //Intercepting forbidden status
            {
              this.loginError = err.error;
              // this.isClicked = false;
              console.log(err);
            }

        )
    }

    else {
      if(this.email.invalid && this.password.valid)
      {
        this.loginError = "Please enter a valid email address!";
      }
      else 
      {
        this.loginError = "All fields must be completed";
      }
      
    }

  }

}
