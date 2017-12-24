import { User } from './user';
import {Meetup} from './meetup';

/**
 * The state of a request relation ship
 */
export enum RequestStatus {
  OPEN = 'OPEN',
  ACCEPT = 'ACCEPT',
  DECLINED = 'DECLINED'
}

/**
 * Encapsulates a participant relation ship
 */
export class MeetupRequest {
  private _participant: User;
  private _meetup: Meetup;
  private _status: RequestStatus;

  constructor(participant: User, meetup: Meetup, status: RequestStatus = RequestStatus.OPEN) {
    this._participant = participant;
    this._meetup = meetup;
    this._status = status;
  }

  get participant(): User {
    return this._participant;
  }

  get meetup(): Meetup {
    return this._meetup;
  }

  get status(): RequestStatus {
    return this._status;
  }

  set status(value: RequestStatus) {
    this._status = value;
  }
}
