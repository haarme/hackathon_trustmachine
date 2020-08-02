import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../models/ChatMessage';
import { DataService } from '../data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  @Input() recieverEmail: any;
  sender: string;
  reciever: string;
  messageContent: string;
  timeStamp: string = new Date().toUTCString();

  constructor(
    public dataService: DataService,
  ) { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeSent;
    this.sender = chatMessage.sender;
    this.reciever = chatMessage.reciever;
  }
}
