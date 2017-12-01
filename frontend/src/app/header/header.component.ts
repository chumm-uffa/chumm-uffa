import {Component} from '@angular/core';
import {AppStateService} from '../core/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent {

  title = 'Come-up Header';

  constructor(private appState: AppStateService) {
  }

  logout() {
    this.appState.isLoggedIn = false;
  }
}
