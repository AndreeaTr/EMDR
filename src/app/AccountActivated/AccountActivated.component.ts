import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-AccountActivated',
  templateUrl: './AccountActivated.component.html',
  styleUrls: ['./AccountActivated.component.css']
})
export class AccountActivatedComponent implements OnInit {
  
  token: string;
  validated: boolean;
  msg: string = "Validating your Data...";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);

    const headers = { 'Content-Type':  'application/json'};


    this.http.post('https://emdr-back-end.herokuapp.com/ActivateAccount/' + this.token , { 'headers': headers, 'observe': 'response' })
        .subscribe(

          responseBody =>
            {
              console.log(responseBody);
              this.msg = "Account activated successfully!";
            },

          err => //Intercepting forbidden status
            {
              console.log(err)
              this.msg = "Something went wrong!"
            }

          )
        }
  }


