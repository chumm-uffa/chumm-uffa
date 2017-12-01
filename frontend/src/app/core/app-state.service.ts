import {Injectable} from '@angular/core';
import {User} from './model/user';

@Injectable()
export class AppStateService {

  private _isLoggedIn = false;
  private _loggedInUser: User;

  constructor() {
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(value: boolean) {
    console.log('set LoggedIn called by ', value);
    if (!value) {
      this._loggedInUser = new User();
    }
    this._isLoggedIn = value;
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  set loggedInUser(value: User) {
    this._loggedInUser = value;
  }
}
