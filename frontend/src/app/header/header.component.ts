import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {BusinessService} from '../core/services/business.service';
import {AppStateService} from '../core/services/app-state.service';
import {
  LOGIN_URL, MEETUP_SEARCH_URL, MEETUP_URL, MY_MEETUPS_URL, REGISTRATION_URL,
  UPDATE_USER_URL
} from '../app-routing-urls';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  myMeetupsUrl = MY_MEETUPS_URL;
  loginUrl = LOGIN_URL;
  registrationUrl = REGISTRATION_URL;
  updateUserUrl = UPDATE_USER_URL;
  meetupSearchUrl = MEETUP_SEARCH_URL;
  meetupUrl = MEETUP_URL;

  constructor(private appState: AppStateService,
              private businessService: BusinessService,
              private translate: TranslateService,
              private router: Router) {
  }

  logout() {
    this.businessService.logout();
    this.router.navigateByUrl('/');
  }

  changeLanguage(lang: string) {
    event.preventDefault();
    this.translate.use(lang);
  }

  isActiv(subRouteUrl): boolean {
    return this.router.isActive(subRouteUrl, true);
  }
}
