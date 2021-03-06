/**
 * The type sex
 */
export enum Sex {
    MALE = 'M',
    FEMALE = 'F',
    BETWEEN = 'SOMEBODYDONTKNOW'
}

export class User {
  private _id: string;
  private _username: string;
  private _password: string;
  private _sex: Sex;
  private _email: string;
  private _weight: string;

  constructor(id: string = '',
              username: string = '',
              password: string = '',
              sex?: Sex,
              email: string = '',
              weight: string = '') {
    this._id = id;
    this._username = username;
    this._password = password;
    if (sex) this._sex = sex;
    this._email = email;
    this._weight = weight;
  }

  public toJSON()
  {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      sex: this.sex,
      email: this.email,
      weight: this.weight
    };
  }

  public static fromJSON(json: any) {
    return new User (
      json.id,
      json.username,
      json.password,
      json.sex,
      json.email,
      json.weight
    )
  }

  public static fromJSONArray(json: any[]) {
    const users: User[] = [];
    json.map( (user) => {
        users.push(User.fromJSON(user));
    });
    return users;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
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

  get sex(): Sex {
    return this._sex;
  }

  set sex(value: Sex) {
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
