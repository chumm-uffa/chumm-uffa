import {User} from './user';

export class Chat {
  private _text: string;
  private _speaker: User;
  private _date: Date;

  constructor(text: string, speaker: User, date: Date = new Date()) {
    this._text = text;
    this._speaker = speaker;
    this._date = date;
  }


  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get speaker(): User {
    return this._speaker;
  }

  set speaker(value: User) {
    this._speaker = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
