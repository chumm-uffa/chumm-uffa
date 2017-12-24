import {Component} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {AppStateService} from '../core/app-state.service';
import { User } from '@chumm-uffa/interface';
import {MockService} from '../core/mock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent {

  appState: string;
  users: User[] = [];

  constructor(private businessService: BusinessService,
              private appstate: AppStateService,
              private mock: MockService) {
    // to show Service
    businessService.checkAlive().subscribe(state => this.appState = state);
    this.users = mock.users;
  }

  simulateLogin(user) {
    this.appstate.isLoggedIn = true;
    this.appstate.loggedInUser = user;
  }

}
