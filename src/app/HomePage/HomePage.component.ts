import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { send } from 'process';


@Component({
  selector: 'app-HomePage',
  templateUrl: './HomePage.component.html',
  styleUrls: ['./HomePage.component.css']
})
export class HomePageComponent implements OnInit, AfterViewChecked {

  @ViewChild('therapy') therapyAnchor;
  @ViewChild('help') helpAnchor;
  @ViewChild('faqs') faqsAnchor;
  @ViewChild('contact') contactAnchor;

  navigated = false;

  herosrc = "assets/img/hero-photo.jpg";
  descsrc = "assets/img/anchor-lee-kO1G3neRA2o-unsplash.jpg";
  card1src = "assets/img/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg";
  card2src = "assets/img/timothy-ayegbede-MCrBXiMskNE-unsplash.jpg";
  card3src = "assets/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg";
  contactsrc = "assets/img/social-media-2786261_1920.jpg";
  isLogged: boolean;
  screenWidth: number = window.innerWidth;


  constructor(private router:Router, private activeRoute: ActivatedRoute, private location: Location, private http: HttpClient) { }

  username: string="";
  phonenumber: string="";
  email: string="";
  message: string="";
  buttonClicked: boolean;
  formError: string="";

  usernameErr: string="rgba(196, 196, 196, 0.3)";
  phoneErr: string="rgba(196, 196, 196, 0.3)";
  mailErr: string="rgba(196, 196, 196, 0.3)";
  messageErr: string="rgba(196, 196, 196, 0.3)";


  ngOnInit() {
      if(sessionStorage.getItem("token"))
      {
        this.isLogged = true;
      }
  }

  ngAfterViewChecked()
  {
    setTimeout(() => {
      if(sessionStorage.getItem("scrollTo"))
      {
        switch(sessionStorage.getItem("scrollTo")){
          case "therapy":
            this.navTo(this.therapyAnchor.nativeElement);
            break;

          case "help":
            this.navTo(this.helpAnchor.nativeElement);  
            break;

          case "faqs":
            this.navTo(this.faqsAnchor.nativeElement);  
            break;  

          case "contact":
            this.navTo(this.contactAnchor.nativeElement);  
            break;  
        }
        sessionStorage.removeItem("scrollTo");
      }
    }, 100)
    
  }


  startTherapy()
  {
    console.log("it should work");
    this.router.navigate(["/chat"]);
  }

  navTo(section:HTMLElement)
  {
    section.scrollIntoView({behavior:"smooth", block:'start'});
  }


  formValidation(){
    this.formError = "";
    console.log(this.username, this.phonenumber, this.email, this.message);
    this.buttonClicked = true;
    if(this.message && this.message.trim().length != 0 && this.username && this.username.trim().length != 0 && this.email && this.email.trim().length != 0 && this.phonenumber && this.phonenumber.trim().length != 0)
    {
      this.ResetFormBorder();
      this.ValidateEmail();
    } 
    else
    { 
      this.verifyFields();
      this.formError = "Please fill in all fields";
    }
  }

  sendEmail(username, phonenumber, email, message) {

    const headers = {"Content-Type":"application/json"}

    this.http.post("https://emdr-back-end.herokuapp.com/sendemail", {username: username, phonenumber: phonenumber, email: email, message: message}, {headers:headers, observe:"response"}).subscribe(
      (response) => {
        console.log(response);
        this.formError = "";
      },
      (err) => {
        console.log(err);
        this.formError = "Something went wrong!";
      });

  }



  ValidateEmail() 
  {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.email))
      {
        this.sendEmail(this.username, this.phonenumber, this.email, this.message);
        this.mailErr ="rgba(196, 196, 196, 0.3)";

      } 
      else 
      {
        this.formError = "You have entered an invalid email address!";
        this.mailErr = "#cc0000";
      }
  }


  verifyFields()
  {
    if(!this.message && this.message.trim().length == 0)
      {
          this.messageErr = "#cc0000";
      }
      else
          this.messageErr = "rgba(196, 196, 196, 0.3)";

    if(!this.username && this.username.trim().length == 0)
    {
        this.usernameErr = "#cc0000";
    }
    else
          this.usernameErr = "rgba(196, 196, 196, 0.3)";
    
    if(!this.email && this.email.trim().length == 0)
    {
        this.mailErr = "#cc0000";
    }
    else
          this.mailErr = "rgba(196, 196, 196, 0.3)";

    if(!this.phonenumber && this.phonenumber.trim().length == 0)
    {
        this.phoneErr = "#cc0000";
    }
    else
          this.phoneErr = "rgba(196, 196, 196, 0.3)";

  }

  ResetFormBorder(){
    this.usernameErr = "rgba(196, 196, 196, 0.3)";
    this.phoneErr ="rgba(196, 196, 196, 0.3)";
    this.mailErr ="rgba(196, 196, 196, 0.3)";
    this.messageErr = "rgba(196, 196, 196, 0.3)";
  }


  logout() {
    sessionStorage.removeItem('token');
    this.isLogged = false;
    this.router.navigate(["/"]);
  }


  onResize(event) {
      this.screenWidth = event.target.innerWidth;
  }

}

