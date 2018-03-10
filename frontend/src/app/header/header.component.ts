import {Component} from '@angular/core';
import {AppStateService} from '../core/app-state.service';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {NotificationService} from '../core/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private appState: AppStateService,
              private notificatinService: NotificationService,
              private translate: TranslateService,
              private router: Router) {
  }

  logout() {
    this.appState.token = null;
    this.appState.loggedInUser = null;
    this.notificatinService.disconnect();
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
