import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController, IonContent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as HighCharts from 'highcharts';
import { ChatMessage } from '../models/ChatMessage';
import { ChatService } from '../chat.service';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html',
    styleUrls: ['chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    public chatList: Array<ChatMessage> = [];
    public chatMessage: string;
    public recieverEmailAddress: string;
    feed: Observable<ChatMessage[]>;

    constructor(
        private router: Router,
        private storage: Storage,
        private menuCntrl: MenuController,
        private alertController: AlertController,
        private chatService: ChatService,
        public dataService: DataService,
        private db: AngularFireDatabase
    ) {
      this.dataService.chatMessageCount = 0;
      if (this.dataService.userType === 'borrower') {
        this.recieverEmailAddress = this.dataService.coachEmail;
      }
      else if (this.dataService.userType === 'coach') {
        this.recieverEmailAddress = this.dataService.coachSelectedBorrowerEmail;
      }
    }

    ngOnInit() {
      this.feed = this.chatService.getMessages();
      this.feed.subscribe(result => {
        const filteredList = result.filter(x => x.sender === this.recieverEmailAddress && x.reciever === this.dataService.email
          && !x.isread);
        this.dataService.chatMessageCount = filteredList.length;
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 150;
      });
    }

    ngOnChanges() {
      this.feed = this.chatService.getMessages();
      this.feed.subscribe(result => {
        const filteredList = result.filter(x => x.sender === this.recieverEmailAddress && x.reciever === this.dataService.email
          && !x.isread);
        this.dataService.chatMessageCount = filteredList.length;
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 150;
      });
    }

    ionViewDidEnter() {
      if (this.dataService.userType === 'borrower') {
        this.recieverEmailAddress = this.dataService.coachEmail;
      }
      else if (this.dataService.userType === 'coach') {
        this.recieverEmailAddress = this.dataService.coachSelectedBorrowerEmail;
      }
    }

    send() {
      if (this.chatMessage.trim().length > 0) {
        this.chatService.sendMessage(this.chatMessage, this.dataService.email, this.recieverEmailAddress);
        this.chatMessage = '';
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 150;
      }
    }
}
