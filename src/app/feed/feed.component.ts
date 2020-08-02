import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../models/ChatMessage';
import { AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: Observable<ChatMessage[]>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.feed = this.chatService.getMessages();
    alert(JSON.stringify(this.feed));
  }

  ngOnChanges() {
    alert(JSON.stringify(this.feed));
    this.feed = this.chatService.getMessages();
  }
}
