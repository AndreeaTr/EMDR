import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';


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

  constructor(private router:Router, private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
  
  }

  ngAfterViewChecked()
  {
    if(!this.navigated)
    {
      this.navigated = true;
      // console.log(this.therapyAnchor);
      this.activeRoute.queryParams.subscribe(params => {
        // console.log(params['section']);
        if(params['section'] === "therapy")
        {
          this.navTo(this.therapyAnchor.nativeElement);
        }

        if(params['section'] === "help")
        {
          this.navTo(this.helpAnchor.nativeElement);
        }

        if(params['section'] === "faqs")
        {
          this.navTo(this.faqsAnchor.nativeElement);
        }

        if(params['section'] === "contact")
        {
          this.navTo(this.contactAnchor.nativeElement);
        }
      });
      // this.location.replaceState('/');

    }
  }


  startTherapy()
  {
    console.log("it should work");
    this.router.navigate(["/chat"]);
  }

  navTo(section:HTMLElement)
  {
    // console.log(section);
    section.scrollIntoView({behavior:"smooth", block:'start'});
  }
}
