import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ChatBot',
  templateUrl: './ChatBot.component.html',
  styleUrls: ['./ChatBot.component.css']
})
export class ChatBotComponent implements OnInit, AfterViewChecked {

  message: String;
  messages;
  botMessages;
  welcomeMessage;
  questionIndex;
  goodbyeMessage = "Thank you for your time! We are currently processing your answers. Please wait a few moments until you are redirected on the Home Page. Do not leave this page until then.";
  isDisabled;

  @ViewChild('chatMessages') private chatMessagesContainer: ElementRef;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if(sessionStorage.getItem('attendedTherapy'))
    {
      this.messages = JSON.parse(sessionStorage.getItem('messages'));
      this.botMessages = JSON.parse(sessionStorage.getItem('botMessages'));
      this.questionIndex = parseInt(sessionStorage.getItem('questionIndex'));
    }
    else
    {
      this.messages = [];
      this.botMessages = [];
      this.welcomeMessage = "Hello, User! Welcome to our EMDR platform. I am your conversational agent and I will assist you during your therapy session. Please take a few moments to answer the following questions."
      this.questionIndex = 0;
      this.isDisabled = false;
      this.getBotMessages();
      this.messages.push({message: this.welcomeMessage, sender: "bot"});
    }
    
  }

  ngAfterViewChecked()
  {
    this.scrollChatToBottom();
  }

  sendMessage() {
    // console.log(this.message);
    if(this.message && this.message.trim().length != 0)
    { 
      var chatMessage = {message: this.message, sender: "user"};
      this.messages.push(chatMessage);
      var botMessage = {message: this.botMessages.shift(), sender: "bot"};
      this.messages.push(botMessage);
      this.questionIndex++;


      if(this.questionIndex == 11)
      {
        sessionStorage.setItem('messages', JSON.stringify(this.messages));
        sessionStorage.setItem('botMessages', JSON.stringify(this.botMessages));
        sessionStorage.setItem('questionIndex', String(this.questionIndex));
        sessionStorage.setItem('attendedTherapy', 'true')
        this.router.navigate(["/therapy"]);
      }

      if(this.questionIndex == 15)
      {
        sessionStorage.setItem('messages', JSON.stringify(this.messages));
        sessionStorage.setItem('botMessages', JSON.stringify(this.botMessages));
        sessionStorage.setItem('questionIndex', String(this.questionIndex));
        sessionStorage.setItem('attendedTherapy', 'true')
        this.router.navigate(["/therapy"]);
      }

      if(this.questionIndex == 18) 
      {
        this.isDisabled = true;
        setTimeout(
          () => {
            this.messages.shift();
            this.messages.pop();
            console.log("data sent to baby", this.messages);
            this.sendMessagesArray();
            sessionStorage.removeItem("messages");
            sessionStorage.removeItem("botMessages");
            sessionStorage.removeItem("questionIndex");
            sessionStorage.removeItem("attendedTherapy");
            this.router.navigate(["/"]);
          },
          5000);
      }
    }  

    this.message="";

    // console.log(this.messages);


  }

  scrollChatToBottom()
  {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }


  navTo(section: string)
  {
    sessionStorage.setItem("scrollTo", section);
    this.router.navigate(["/"]);
  }


  getBotMessages() {
    this.http.get("http://127.0.0.1:5000/chatbotENG", {observe: 'response'}).subscribe(
      (response) => {
        this.botMessages = response.body["intrebari_eng"];
        this.botMessages.push(this.goodbyeMessage);
        this.messages.push({message: this.botMessages.shift(), sender: "bot"});
      },
      (err) => {
        console.log(err);
      }
      );
  }

  sendMessagesArray() {
    this.http.post("http://127.0.0.1:5000//chatbotAns", this.messages, {observe: 'response'}).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
      );
  }

}
