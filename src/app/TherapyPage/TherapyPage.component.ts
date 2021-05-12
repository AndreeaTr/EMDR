import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';

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
  minutes = 2;
  seconds = 0;
  initialMinutes;
  initialSeconds;
  sessionStarted = false;
  timer;
  sessionEnded = false;
  showFooter = 1;
  hideButtons;
  startDialogue = true;
  audioCtx = new AudioContext();
  audio = new Audio();
  audioSource;
  panNode: StereoPannerNode;
  ballOrientation;
  
  @ViewChild('ball') ball; 

  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this.elem = document.documentElement;

    this.audio.src = "../../../assets/sound/328117__greenvwbeetle__pop-8.flac";
    this.audio.load();

    this.audioSource = this.audioCtx.createMediaElementSource(this.audio);
    this.panNode = this.audioCtx.createStereoPanner();

    this.audioSource.connect(this.panNode);
    this.panNode.connect(this.audioCtx.destination);

    this.panNode.pan.setValueAtTime(1, this.audioCtx.currentTime);
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
    if(document.fullscreenElement){
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

    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;
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

  beginSession()
  {
    this.initialMinutes = this.minutes;
    this.initialSeconds = this.seconds;

    this.toggle();
    this.startDialogue = false;
    this.ball.nativeElement.onanimationiteration = () => {
      this.ballOrientation = this.ballOrientation == 1 ? -1 : 1;
      this.panNode.pan.setValueAtTime(this.ballOrientation, this.audioCtx.currentTime);
      this.playAudio();
    };
  }


  minutesUp() {
    if(this.minutes < 10)
    {
      this.minutes += 1;
    }
  }

  minutesDown() {
    if(this.minutes > 2)
    {
      this.minutes -= 1;
    }
  } 

  secondsUp(){

    if(this.seconds==30)
    {
      this.seconds = 0;
      this.minutesUp();
    }
    else if(this.minutes <10)
    {
      this.seconds += 30;
    }

  }

  secondsDown() {
    if(this.seconds==0 && this.minutes > 2)
    {
      this.seconds += 30;
      this.minutesDown();
    }
    else
    {
      this.seconds = 0;
    }
  }

  playAudio(){
    this.audio.play();
  }
  
}



