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

  herosrc = "assets/img/hero-photo.png";
  descsrc = "assets/img/anchor-lee-kO1G3neRA2o-unsplash.jpg";
  card1src = "assets/img/stephanie-liverani-Zz5LQe-VSMY-unsplash.jpg";
  card2src = "assets/img/timothy-ayegbede-MCrBXiMskNE-unsplash.jpg";
  card3src = "assets/img/michael-dam-mEZ3PoFGs_k-unsplash.jpg";
  contactsrc = "assets/img/social-media-2786261_1920.jpg";


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
