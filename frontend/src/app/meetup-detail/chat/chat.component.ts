import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../core/model/chat';
import {BusinessService} from '../../core/business.service';
import {AppStateService} from '../../core/app-state.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input()
  meetupId: string;

  messages: Chat[] = [];
  newMessage = '';

  constructor(private businessService: BusinessService,
              private appState: AppStateService) {
  }

  ngOnInit() {
    this.businessService.loadChatsByMeetupId(this.meetupId).subscribe(chats =>
      this.messages = chats.sort((a, b) => a.date.getTime() - b.date.getTime())
    );
  }

  getOwnerClass(username: string): string {
    return username === this.appState.loggedInUser.username ? 'owner' : '';
  }
}


