import { User } from './user';
import { Hall } from './hall';

/**
 * Encapsulate a single meetup
 */
export class Meetup {
  /**
   * The unique id of the meetup
   */
  private _id: string;
  /**
   * The owner of the meetup
   */
  private _owner: User;
  /**
   * The date/time when the meetup starts
   */
  private _from: Date;
  /**
   * The date/time when the meetup ends
   */
  private _to: Date;
  /**
   * The location of the outdoor event.
   */
  private _outdoor: string;
  /**
   * The id of the climbing gym where the indoor meetup happens
   */
  private _indoor: Hall;
  /**
   * Short description of the activity
   */
  private _activity: string;
  /**
   * The number of requests
   */
  private _numberOfRequest: number;
  /**
   * The number of accepted participant
   */
  private _numberOfParticipant: number;


  constructor(id: string,
              owner: User,
              from: Date,
              to: Date,
              outdoor: string,
              indoor: Hall,
              activity: string = '',
              numberOfRequest: number = 0,
              numberOfParticipant: number = 0) {
    this._id = id;
    this._owner = owner;
    this._from = from;
    this._to = to;
    this._outdoor = outdoor;
    this._indoor = indoor;
    this._activity = activity;
    this._numberOfRequest = numberOfRequest;
    this._numberOfParticipant = numberOfParticipant;
  }

  public toJSON() {
    return {
        id: this.id,
        owner: this.owner,
        from: this.from,
        to: this.to,
        outdoor: this.outdoor,
        indoor: this.indoor,
        activity: this.activity,
        numberOfRequest: this.numberOfRequest,
        numberOfParticipant: this.numberOfParticipant
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get owner(): User {
    return this._owner;
  }

  set owner(value: User) {
    this._owner = value;
  }

  get from(): Date {
    return this._from;
  }

  set from(value: Date) {
    this._from = value;
  }

  get to(): Date {
    return this._to;
  }

  set to(value: Date) {
    this._to = value;
  }

  get outdoor(): string {
    return this._outdoor;
  }

  set outdoor(value: string) {
    this._outdoor = value;
  }

  get indoor(): Hall {
    return this._indoor;
  }

  set indoor(value: Hall) {
    this._indoor = value;
  }

  get activity(): string {
    return this._activity;
  }

  set activity(value: string) {
    this._activity = value;
  }

  get numberOfRequest(): number {
    return this._numberOfRequest;
  }

  set numberOfRequest(value: number) {
    this._numberOfRequest = value;
  }

  get numberOfParticipant(): number {
    return this._numberOfParticipant;
  }

  set numberOfParticipant(value: number) {
    this._numberOfParticipant = value;
  }
}
