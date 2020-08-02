import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { ChatMessage } from './models/ChatMessage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: Observable<ChatMessage>;
  emitter: any;

  constructor(
    private dataService: DataService,
    private db: AngularFireDatabase) {
  }

  sendMessage(sendMessage: string, senderEmail: string, recieverEmail: string) {
    const timeStamp = this.getTimeStamp();
    const chatMessages = this.db.list('vistahacka/messages');
    chatMessages.push({
        message: sendMessage,
        timeSent: timeStamp,
        sender: senderEmail,
        reciever: recieverEmail,
        isread: false
    });
  }

  getMessages(): any {
    return this.db.list('vistahacka/messages', ref => ref.limitToLast(25)).valueChanges();
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return (date + ' ' + time);
  }
}
