import {Component} from '@angular/core';
import {AppStateService} from '../core/services/app-state.service';
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
    this.appState.token = null;
    this.appState.loggedInUser = null;
    // TODO evtl. Service call 'logout' einpflegen
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
