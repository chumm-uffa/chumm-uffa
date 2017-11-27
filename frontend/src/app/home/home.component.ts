import {Component} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {AppStateService} from '../core/app-state.service';
import {User} from '../core/model/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent {

  appState: string;

  constructor(private businessService: BusinessService,
              private appstate: AppStateService) {
    // to show Service
    businessService.checkAlive().subscribe(state => this.appState = state);
  }

  simulateLogin() {
    this.appstate.isLoggedIn = true;
    this.appstate.loggedInUser = new User('WilliCliffhanger', '', 'm');
  }

}
