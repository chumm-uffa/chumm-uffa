import {Component} from '@angular/core';
import {BusinessService} from '../core/services/business.service';
import {AppStateService} from '../core/services/app-state.service';
import {User} from '@chumm-uffa/interface';
import {MockService} from '../core/services/mock.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  users: User[] = [];

  constructor(private businessService: BusinessService,
              private router: Router,
              private mock: MockService) {
    // to show Service
    this.users = mock.users;
  }

  simulateLogin(user) {
    this.businessService.login(user).subscribe( response => {
      this.router.navigate(['/mymeetups']);
    },  err => {
      this.businessService.register(user).subscribe( response => {
        this.router.navigate(['/mymeetups']);
      });
    });
  }
}
