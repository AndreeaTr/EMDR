import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  checkMailForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.checkMailForm = new FormGroup({
      'email': new FormControl('', {validators: [Validators.required]}),
    })
  
  }

  reset() {

  }

}
