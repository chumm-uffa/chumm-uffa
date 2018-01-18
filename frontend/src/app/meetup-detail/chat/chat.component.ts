import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Chat, Meetup} from '@chumm-uffa/interface';
import {BusinessService} from '../../core/business.service';
import {AppStateService} from '../../core/app-state.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  @Input()
  meetup: Meetup;

  messages: Chat[] = [];
  newMessage = '';

  private refrehTimer;

  constructor(private businessService: BusinessService,
              private activatedRoute: ActivatedRoute,
              private appState: AppStateService) {
  }

  ngOnInit() {
    /*load chats*/
    this.loadChats();
    /*Refresh every 1s*/
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
    this.businessService.createChat(this.newMessage, this.meetup.id).subscribe( res => {
      this.messages.push(res.chat);
      this.newMessage = '';
    });
  }

  private loadChats() {
    console.log('Chat reloaded');
    this.businessService.loadChatsByMeetupId(this.meetup.id).subscribe(res => {
      this.messages = res.chats.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }
}


