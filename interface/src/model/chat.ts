import { User } from './user';

export class Chat {
  private _id:  string;
  private _text: string;
  private _speaker: User;
  private _date: Date;

  constructor(id: string,
              text: string,
              speaker: User,
              date: Date = new Date()) {
    this._id = id;
    this._text = text;
    this._speaker = speaker;
    this._date = date;
  }

  public toJSON() {
      return {
          id: this.id,
          text: this.text,
          speaker: this.speaker,
          date: this.date
      };
  }

  get id(): string {
      return this._id;
  }

  set id(value: string) {
      this._id = value;
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
