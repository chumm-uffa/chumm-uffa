import {Component} from '@angular/core';
import {AppStateService} from '../core/app-state.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private appState: AppStateService,
              private translate: TranslateService,
              private router: Router) {
  }

  logout() {
    this.appState.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

  changeLanguage(lang: string) {
    event.preventDefault();
    this.translate.use(lang);
  }

}
