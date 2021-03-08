import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-ChatBot',
  templateUrl: './ChatBot.component.html',
  styleUrls: ['./ChatBot.component.css']
})
export class ChatBotComponent implements OnInit, AfterViewChecked {

  message: String;
  messages = [];

  @ViewChild('chatMessages') private chatMessagesContainer: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked()
  {
    this.scrollChatToBottom();
  }

  sendMessage() {
    console.log(this.message);
    if(this.message && this.message.trim().length != 0)
    { 
      var chatMessage = {message: this.message, sender: "user"};
      this.messages.push(chatMessage);
      var botMessage = {message: "*Message sent by Bot*", sender: "bot"};
      this.messages.push(botMessage);
    }  

    this.message="";

  }

  scrollChatToBottom()
  {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

}
