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
  today = new Date();
  inptype = 'text';
  errorMsg = "";
  successMsg = "";
  passnotmatching:boolean = false;

  emailclick: boolean = false;
  firstnameclick:boolean = false; 
  lastnameclick:boolean = false;
  bdayclick:boolean = false;
  phoneclick:boolean = false;
  genderclick:boolean = false;
  pcodeclick:boolean = false;
  countryclick:boolean = false;
  passclick:boolean = false;
  repassclick:boolean = false;



  ngOnInit() {
    // this.loginError = false;
    // this.isClicked = false;
    this.fixGenderArrow(); 
    console.log(this.getTodayAsString());
    // REACTIVE-FORM
    this.registrationForm = new FormGroup({
      'firstName': new FormControl('', {validators: [Validators.required]}),
      'lastName': new FormControl('', {validators: [Validators.required]}),
      'bday': new FormControl('', {validators: [Validators.required]}),
      'gender': new FormControl('', {validators: [Validators.required]}),
      'email': new FormControl('', {validators: [Validators.required, Validators.email]}),
      'phnb': new FormControl('', {validators: [Validators.required]}),
      'pcode': new FormControl('', {validators: [Validators.required]}),
      'country': new FormControl('', {validators: [Validators.required]}),
      'password': new FormControl('', {validators: [Validators.required]}),
      'repeatPassword': new FormControl('', {validators: [Validators.required]})
    })
    //

    console.log(this.registrationForm.get("email"));
  }

  get firstName() {return this.registrationForm.get("firstName")};
  get lastName() {return this.registrationForm.get("lastName")};
  get bday() {return this.registrationForm.get("bday")};
  get gender() {return this.registrationForm.get("gender")};
  get email() {return this.registrationForm.get("email")};
  get phnb() {return this.registrationForm.get("phnb")};
  get pcode() {return this.registrationForm.get("pcode")};
  get country() {return this.registrationForm.get("country")};
  get password() {return this.registrationForm.get("password")};
  get repeatPassword() {return this.registrationForm.get("repeatPassword")};


  register()
  {
    if(this.registrationForm.valid)
    {
      if(this.password.value !== this.repeatPassword.value)
      {
        this.errorMsg = "Passwords don't match!";
        this.passnotmatching = true;
        this.passclick = true;
        this.repassclick = true;
      }
      else{
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

        this.http.post('https://emdr-back-end.herokuapp.com/register', body, { 'headers': headers, 'observe': 'response' })
          .subscribe(

            responseBody =>
              {
                this.errorMsg = "";
                this.successMsg = "Activation email sent successfully. Please check your inbox!"

                // Resetting the form
                /*this.registrationForm.reset();

                this.emailclick = false;
                this.firstnameclick = false; 
                this.lastnameclick = false;
                this.bdayclick = false;
                this.phoneclick = false;
                this.genderclick = false;
                this.pcodeclick = false;
                this.countryclick = false;
                this.passclick = false;
                this.repassclick = false;*/
                // 

                console.log(responseBody);
              },

            err => //Intercepting forbidden status
              {
                // this.registrationError = true;
                // this.isClicked = false;
                console.log(err);
                this.errorMsg = err.error[0].errorENG;
              },

            () =>
              {
                console.log("ultimul");
              }
          )
      }

      
    }
    else 
    {
      this.errorMsg = "All fields must be completed";
      this.emailclick = true;
      this.firstnameclick = true; 
      this.lastnameclick = true;
      this.bdayclick = true;
      this.phoneclick = true;
      this.genderclick = true;
      this.pcodeclick = true;
      this.countryclick = true;
      this.passclick = true;
      this.repassclick = true;
    }
    

  }


  getTodayAsString(): string {
    var y = this.today.getFullYear()
    var m:string;
    var d:string;

    if(this.today.getMonth() <10 )
    {
       m = "0" + (this.today.getMonth()+1);
    }
    else 
    {
       m = (this.today.getMonth()+1).toString();
    }
    
    
    if(this.today.getDate() <10 )
    {
       d = "0" + this.today.getDate();
    }
    else 
    {
       d = this.today.getDate().toString();
    }
    

    return y + "-" + m + "-" + d;
  }

  fixGenderArrow() {
    var el = document.getElementsByTagName('select');

          for (var i = 0; i < el.length; i++) {
            var attr = el[i].attributes; /* get all attributes on the element */
            for (var j = 0; j < attr.length; j++) {
              if (attr[j].name.indexOf('_ngcontent') == 0) { /* if element has an attribute whose name has data- */
                el[i].style.backgroundPositionX = '95%';
                break;
              }
            }
}

  }

  onFocus() {
    this.inptype = 'date';
  }

  emailclicked() {
    this.emailclick = true;
  }


  0
}

