import {Injectable} from '@angular/core';
import {User} from '@chumm-uffa/interface';

@Injectable()
export class AppStateService {

  private _loggedInUser: User;
  private _token: string;

  constructor() {
  }

  get isLoggedIn(): boolean {
    return !!this._token;
  }

  get loggedInUser(): User {
    return this._loggedInUser;
  }

  set loggedInUser(value: User) {
    this._loggedInUser = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
