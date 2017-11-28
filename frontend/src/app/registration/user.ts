export class User {

  private _username: string;
  private _password: string;
  private _sex: string;
  private _email: string;

  constructor(username: string = '',
              password: string = '',
              sex: string = '',
              email: string = '') {
    this._username = username;
    this._password = password;
    this._sex = sex;
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  get username(): string {
    return this._username;
  }

  get sex(): string {
    return this._sex;
  }

  get email(): string {
    return this._email;
  }
}
