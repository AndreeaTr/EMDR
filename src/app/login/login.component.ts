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

      const headers = { 'Content-Type':  'application/json' };

      let email = this.loginForm.value["email"];
      let password = this.loginForm.value["password"];

      const body = {

        "email": email,
        "password": password,

      };
      console.log(body);

      this.http.post('http://127.0.0.1:5000/login', body, { 'headers': headers, 'observe': 'response' })
        .subscribe(

          responseBody =>
            {
              // this.router.navigate(["/login"]);
              console.log(responseBody);
            },

          err => //Intercepting forbidden status
            {
              // this.registrationError = true;
              // this.isClicked = false;
              console.log(err);
            }

        )
    }

    else {
      this.loginError = "All fields must be completed";
    }


  }


}
