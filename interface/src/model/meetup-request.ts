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
    private _id: string;
    private _participant: User;
    private _meetup: Meetup;
    private _status: RequestStatus;

    constructor(id: string, participant: User, meetup: Meetup, status: RequestStatus = RequestStatus.OPEN) {
        this._id = id;
        this._participant = participant;
        this._meetup = meetup;
        this._status = status;
    }

  public toJSON() {
    return {
      participant: this.participant,
      meetup: this.meetup,
      status: this.status,
      id: this.id
    };
  }

  get id(): string {
    return this._id;
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
