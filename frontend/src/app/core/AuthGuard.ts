import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AppStateService} from './app-state.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private appStateService: AppStateService,
              private router: Router) {
  }

  canActivate() {

    if (!this.appStateService.isLoggedIn) {
      this.router.navigate(['/']);
    }

    return this.appStateService.isLoggedIn;
  }
}
