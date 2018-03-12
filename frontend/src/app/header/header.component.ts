import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {BusinessService} from '../core/services/business.service';
import {AppStateService} from '../core/services/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

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
