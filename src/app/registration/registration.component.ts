import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) {}

  hide = true;
  loginError: boolean;
  isClicked: boolean;
  registrationForm: FormGroup;


  ngOnInit() {
    // this.loginError = false;
    // this.isClicked = false;

    // REACTIVE-FORM
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', {validators: [Validators.required]}),
      'bday': new FormControl('', {validators: [Validators.required]}),
      'email': new FormControl('', {validators: [Validators.required]}),
      'pcode': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]}),
      'lastName': new FormControl('', {validators: [Validators.required]}),
      'gender': new FormControl('', {validators: [Validators.required]}),
      'phnb': new FormControl('', {validators: [Validators.required]}),
      'country': new FormControl('', {validators: [Validators.required]}),
      'repeatPassword': new FormControl('', {validators: [Validators.required]})
    })
    //
  }

  register()
  {
    console.log('Registration works!');
  }

  // get username() { return this.loginForm.get('username'); }
  // get password() { return this.loginForm.get('password'); }
  // get email() { return this.loginForm.get('email'); }
  // get firstName() { return this.loginForm.get('firstName'); }
  // get lastName() { return this.loginForm.get('lastName'); }

  // login()
  // {
  //   this.isClicked = true;

  //   const headers = { 'Content-Type':  'application/json' };

  //   let username = this.loginForm.value["username"];
  //   let password = this.loginForm.value["password"];

  //   let acc = new Account(username,password);

  //   this.http.post('https://virtual-library-system.herokuapp.com/authentication/login', JSON.stringify(acc), { 'headers': headers, 'observe': 'response' })
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
  //     );

  // }

}

