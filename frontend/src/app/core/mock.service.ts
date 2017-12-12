import {Injectable} from '@angular/core';
import {Meetup} from './model/meetup';
import {User} from './model/user';
import {MeetupRequest, RequestStatus} from './model/meetup-request';
import {ResourceServiceInterface} from './resource.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Hall} from './model/hall';

/**
 * Mock for the resource service
 */
@Injectable()
export class MockService implements ResourceServiceInterface {

  private _users: User[];
  private _meetups: Meetup[];
  private _meetupRequest: MeetupRequest[];

  constructor() {
    this.generateUsers();
    this.generateMeetups();
    this.generateRequest();
  }

  checkAlive(): Observable<string> {
    return of('i am alive');
  }

  newAlive(): Observable<string> {
    return of(' new i am alive');
  }

  getMeetUps(user: User): Observable<Meetup[]> {
    return of(this._meetups.filter(meetup => meetup.owner.username === user.username));
  }

  getMeetUpRequests(user: User): Observable<MeetupRequest[]> {
    return of(this._meetupRequest.filter(participant => participant.participant.username === user.username));
  }

  loadMeetup(meetupId: string): Observable<Meetup> {
    return of(this._meetups.find(mu => mu.id === meetupId));
  }

  getHalls(): Observable<Hall[]> {
    const halls: Hall[] = [];
    halls.push(new Hall(1, 'Die Kletterhalle (St. Gallen)'));
    halls.push(new Hall(2, 'Kletterhalle (Winterthur)'));
    return of(halls);
  }

  private generateUsers() {
    this._users = [];
    this._users.push(new User('WilliCliffhanger'));
    this._users.push(new User('BarbaraChumNidUffa'));
    this._users.push(new User('UrsChrumBei'));
    this._users.push(new User('PetraImmerBlau'));
  }

  /**
   * Generates meetups mock data
   */
  private generateMeetups() {
    this._meetups = [];
    this._meetups.push(new Meetup('id1', this._users[0], new Date(), new Date(), 'Out_1', '', 'fressa', 1, 2));
    this._meetups.push(new Meetup('id2', this._users[0], new Date(), new Date(), '', '2', 'saufa', 3, 4));
    this._meetups.push(new Meetup('id3', this._users[1], new Date(), new Date(), '', 'Gym_c', '', 5, 6));
    this._meetups.push(new Meetup('id4', this._users[2], new Date(), new Date(), 'Out_2', '', '', 1, 2));
    this._meetups.push(new Meetup('id5', this._users[3], new Date(), new Date(), '', 'Gym_e', '', 3, 4));
  }


  /**
   * Generates meetups mock data
   */
  private generateRequest() {
    this._meetupRequest = [];
    this._meetupRequest.push(new MeetupRequest(this._users[1], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest(this._users[2], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest(this._users[3], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest(this._users[0], this._meetups[2], RequestStatus.ACCEPT));
    this._meetupRequest.push(new MeetupRequest(this._users[1], this._meetups[2]));
    this._meetupRequest.push(new MeetupRequest(this._users[0], this._meetups[3], RequestStatus.DECLINED));
    this._meetupRequest.push(new MeetupRequest(this._users[3], this._meetups[3]));
    this._meetupRequest.push(new MeetupRequest(this._users[0], this._meetups[4]));
  }
}
