import {Component} from '@angular/core';
import {BusinessService} from '../core/business.service';
import {AppStateService} from '../core/app-state.service';
import {User} from '@chumm-uffa/interface';
import {MockService} from '../core/mock.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomeComponent {

  users: User[] = [];

  constructor(private businessService: BusinessService,
              private appstate: AppStateService,
              private router: Router,
              private mock: MockService) {
    // to show Service
    this.users = mock.users;
  }

  simulateLogin(user) {
    this.appstate.token = 'was drin';
    this.appstate.loggedInUser = user;
    this.businessService.login(user).subscribe( response => {
      this.router.navigate(['/mymeetups']);
    },  err => {
      this.businessService.register(user).subscribe( response => {
        this.router.navigate(['/mymeetups']);
      });
    });
  }
}
