import {Component} from '@angular/core';
import {AppStateService} from '../core/app-state.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html'
})
export class HeaderComponent {

  title = 'Come-up Header';

  constructor(private appState: AppStateService,
              private translate: TranslateService) {
  }

  logout() {
    this.appState.isLoggedIn = false;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

}
