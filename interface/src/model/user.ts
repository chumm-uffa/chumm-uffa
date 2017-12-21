export class User {

  private _username: string;
  private _password: string;
  private _sex: string;
  private _email: string;
  private _weight: string;

  constructor(username: string = '',
              password: string = '',
              sex: string = '',
              email: string = '',
              weight: string = '') {
    this._username = username;
    this._password = password;
    this._sex = sex;
    this._email = email;
    this._weight = weight;
  }

  public toJSON()
  {
    return {
      username: this.username,
      password: this.password,
      sex: this.sex,
      email: this.email,
      weight: this.weight
    };
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

  get weight(): string {
    return this._weight;
  }

  set weight(value: string) {
    this._weight = value;
  }
}
