import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Chat, Meetup} from '@chumm-uffa/interface';
import {BusinessService} from '../../core/business.service';
import {AppStateService} from '../../core/app-state.service';
import {NotificationService} from '../../core/notification.service';

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
              private notificatinService: NotificationService,
              private appState: AppStateService) {
  }

  ngOnInit() {
    /*load chats*/
    this.loadChats();
    this.notificatinService.connect().subscribe((notification) => this.loadChats());
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
    this.businessService.createChat(this.newMessage, this.meetup.id).subscribe( chat => {
      this.messages.push(chat);
      this.newMessage = '';
    });
  }

  private loadChats() {
    if (this.meetup) {
      this.businessService.loadChatsByMeetupId(this.meetup.id).subscribe(chats => {
        this.messages = chats.sort((a, b) => a.date.getTime() - b.date.getTime());
      });
    }
  }
}


