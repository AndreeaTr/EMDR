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
  loginError: boolean;
  isClicked: boolean;
  loginForm: FormGroup;


  ngOnInit() {
    this.loginError = false;
    this.isClicked = false;

    // REACTIVE-FORM
    this.loginForm = new FormGroup({
      'username': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]})
    })
    //
  }

  get username() { return this.loginForm.get('username'); }

  get password() { return this.loginForm.get('password'); }

  login()
  {
    console.log('Login works!');
  }

  // login()
  // {
  //   this.isClicked = true;

  //   const headers = { 'Content-Type':  'application/json' };

  //   let username = this.loginForm.value["username"];
  //   let password = this.loginForm.value["password"];

  //   this.http.post('https://virtual-library-system.herokuapp.com/authentication/login', {}, { 'headers': headers, 'observe': 'response' })
  //     .subscribe(

  //       responseBody =>
  //         {
  //           let lst = responseBody.body['jwt'].split(" ");;
  //           let token = lst[1];
  //           acc.setToken(token);
  //           sessionStorage.setItem("token", acc.getToken());
  //           sessionStorage.setItem("user", acc.getUsername());
  //           this.router.navigate(["/search-results"]);
  //         },

  //       err => //Intercepting forbidden status
  //         {
  //           this.loginError = true;
  //           this.isClicked = false;
  //         },

  //       () =>
  //         {

  //         }
  //     )

  // }

}
