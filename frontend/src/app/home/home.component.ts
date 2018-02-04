import {Component} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {AppStateService} from '../core/app-state.service';
import {User} from '@chumm-uffa/interface';
import {MockService} from '../core/mock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent {

  users: User[] = [];

  constructor(private businessService: BusinessService,
              private appstate: AppStateService,
              private mock: MockService) {
    // to show Service
    this.users = mock.users;
  }

  simulateLogin(user) {
    this.appstate.token = 'was drin';
    this.appstate.loggedInUser = user;
    if (user.username === 'Eder') {
      const us = new User(null, 'Eder', '12345678');
      this.businessService.login(us).subscribe( response => {
      });
    }
  }

}
