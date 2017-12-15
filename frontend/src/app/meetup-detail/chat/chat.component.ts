import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Chat} from '../../core/model/chat';
import {BusinessService} from '../../core/business.service';
import {AppStateService} from '../../core/app-state.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input()
  meetupId: string;

  messages: Chat[] = [];
  newMessage = '';

  private refrehTimer;

  constructor(private businessService: BusinessService,
              private appState: AppStateService) {
  }

  ngOnInit() {
    this.loadChats();
    /*Refresh every 10s*/
    this.refrehTimer = setInterval(this.loadChats.bind(this), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.refrehTimer);
  }

  /*Mark messages of the current user*/
  getCurrentUserClass(username: string): string {
    return username === this.appState.loggedInUser.username ? 'currentUser' : '';
  }

  addMessage(): void {
    /* mit dem push wirds sofort sichtbar*/
    this.messages.push(this.businessService.createChat(this.newMessage, this.meetupId));
    this.newMessage = '';
  }

  private loadChats() {
    console.log('Chat reloaded');
    this.businessService.loadChatsByMeetupId(this.meetupId).subscribe(chats =>
      this.messages = chats.sort((a, b) => a.date.getTime() - b.date.getTime())
    );
  }
}


