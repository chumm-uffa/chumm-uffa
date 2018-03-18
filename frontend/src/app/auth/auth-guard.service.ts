import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AppStateService} from '../core/services/app-state.service';
import {LOGIN_URL, MEETUP_DETAIL_URL} from '../app-routing-urls';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private appStateService: AppStateService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {

    if (!this.appStateService.isLoggedIn) {
      if (route.url.some((segment) => segment.path === MEETUP_DETAIL_URL)) {
        this.router.navigate(['/' + LOGIN_URL], {queryParams: route.queryParams});
      }else {
      this.router.navigate(['/']);
      }
    }
    return this.appStateService.isLoggedIn;
  }
}
