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

  set password(value: string) {
    this._password = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get sex(): string {
    return this._sex;
  }

  set sex(value: string) {
    this._sex = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
