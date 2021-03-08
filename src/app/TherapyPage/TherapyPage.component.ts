import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-TherapyPage',
  templateUrl: './TherapyPage.component.html',
  styleUrls: ['./TherapyPage.component.css']
})
export class TherapyPageComponent implements OnInit {

  moving = false;
  ballstate = "paused";
  showDialogue = false;
  elem;
  fullscreen = false;
  minutes = 0;
  seconds = 10;
  sessionStarted = false;
  timer;
  sessionEnded = false;
  showFooter = 1;
  hideButtons;

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this.elem = document.documentElement;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  toggle() {
    this.moving = !this.moving;
    if(this.moving)
    {
      this.ballstate = "running";

      if(!this.sessionStarted)
      {  
        this.timer = setInterval( () => {
            if(this.seconds ==0  && this.minutes == 0)
            {
              this.ballstate = "paused";
              this.moving = false;
              clearInterval(this.timer);
              this.sessionEnded = true;
            }
            else if(this.seconds <=0 )
            {
              this.minutes--;
              this.seconds = 59;
            }
            else
            {
              this.seconds--;
            }

        }, 1000);
        this.sessionStarted = true;
      }
    }
    else
    {
      this.ballstate = "paused";
      clearInterval(this.timer);
      this.sessionStarted =  false;
    }
  }

  closedialogue() {
    this.showDialogue = false;
  }

  showdialogue() {
    this.showDialogue = true;
  }

  toggleFullscreen() {

    if(this.fullscreen)
    {
      this.closeFullscreen(); 
    }
    else
    {
      this.openFullscreen();
    }

    this.fullscreen = !this.fullscreen;
  }


  resetTimer() {
    if(this.timer)
    {
      clearInterval(this.timer);
    }

    this.minutes = 45;
    this.seconds = 0;
    this.sessionStarted = false;
    this.ballstate = "paused";
    this.moving = false;
  }


  addzeros(val) {
    if(val < 10)
    {
      return true;
    }

    return false;
    
  }

  showButtons()
  {   
        this.showFooter = 1;

        if(this.hideButtons)
        {
          clearTimeout(this.hideButtons);
        }

        if(this.sessionStarted)
        {
          this.hideButtons = setTimeout( () => {
            this.showFooter = 0;
          }, 3000);
        }  
  }
  
}



