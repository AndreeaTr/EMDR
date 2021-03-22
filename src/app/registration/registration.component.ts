import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';

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
  registrationError: boolean;
  errorList: any;


  ngOnInit() {
    // this.loginError = false;
    // this.isClicked = false;

    // REACTIVE-FORM
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', {validators: [Validators.required]}),
      'lastName': new FormControl('', {validators: [Validators.required]}),
      'bday': new FormControl('', {validators: [Validators.required]}),
      'gender': new FormControl('', {validators: [Validators.required]}),
      'email': new FormControl('', {validators: [Validators.required,Validators.email]}),
      'phnb': new FormControl('', {validators: [Validators.required]}),
      'pcode': new FormControl('', {validators: [Validators.required]}),
      'country': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]}),
      'repeatPassword': new FormControl('', {validators: [Validators.required]})
    })
    //

    console.log(this.registrationForm.get("email"));
  }

  get email() {return this.registrationForm.get("email")}

  register()
  {
    this.isClicked = true;

    const headers = { 'Content-Type':  'application/json' };

    let firstName = this.registrationForm.value["firstName"];
    let lastName = this.registrationForm.value["lastName"];
    let bday = this.registrationForm.value["bday"];
    let gender = this.registrationForm.value["gender"];
    let email = this.registrationForm.value["email"];
    let phnb = this.registrationForm.value["phnb"];
    let pcode = this.registrationForm.value["pcode"];
    let country = this.registrationForm.value["country"];
    let password = this.registrationForm.value["password"];
    let matchingPassword = this.registrationForm.value["repeatPassword"];

    const body = {

      "firstname": firstName,
      "lastname": lastName,
      "dateofbirth": bday,
      "gender": gender,
      "email": email,
      "phonenumber":phnb,
      "postalcode":pcode,
      "country":country,
      "password": password,
      "repeat_password": matchingPassword,

    };
    console.log(body);

    this.http.post('http://127.0.0.1:5000/register', body, { 'headers': headers, 'observe': 'response' })
      .subscribe(

        responseBody =>
          {
            this.router.navigate(["/login"]);
          },

        err => //Intercepting forbidden status
          {
            this.registrationError = true;
            this.isClicked = false;
          },

        () =>
          {
            console.log("ultimul");
          }
      )

  }

}

