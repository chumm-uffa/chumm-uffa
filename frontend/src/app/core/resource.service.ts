import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Meetup} from './model/meetup';
import {MeetupRequest} from './model/meetup-request';
import {User} from './model/user';
import {Chat} from './model/chat';


/**
 * Resource service interface
 */
export interface ResourceServiceInterface {
  checkAlive(): Observable<string>;

  newAlive(): Observable<string>;

  getMeetUps(user: User): Observable<Meetup[]>;

  getMeetUpRequests(user: User): Observable<MeetupRequest[]>;

  loadMeetup(meetupId: string): Observable<Meetup>;

  loadRequests(meetupId: string): Observable<MeetupRequest[]>;

  updateRequest(request: MeetupRequest): Observable<MeetupRequest>;

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]>;
}

/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */
@Injectable()
export class ResourceService implements ResourceServiceInterface {

  private urlDemo = 'http://localhost:8080/api/alive';

  constructor(private http: HttpClient) {
  }

  /**
   * Demo Inject Service
   * @returns {Observable<string>}
   */
  checkAlive(): Observable<string> {
    return Observable.create(function (observer) {
      observer.next('i am alive');
    });
  }

  /**
   * Demo REST Aufruf
   * @returns {Observable<string>}
   */
  newAlive(): Observable<string> {
    return this.http.post<string>(this.urlDemo, {text: 'Is Server Alive?'});
  }

  /**
   * Demo REST Aufruf
   * @returns {Observable<Meetup[]>}
   */
  getMeetUps(user: User): Observable<Meetup[]> {
    return null;
  }

  /**
   * Demo REST Aufruf
   * @returns {Observable<MeetupRequest[]>}
   */
  getMeetUpRequests(user: User): Observable<MeetupRequest[]> {
    return null;
  }

  saveMeetup(meetup: Meetup): void {
    console.log('not yet implemented saveMeetup()');
    console.log('meetup to string ', meetup);
  }

  loadMeetup(meetupId: string): Observable<Meetup> {
    throw new Error('Method not implemented.');
  }

  /**
   * Das Meetup im Request Objekt müsste nicht geladen werden.
   * @param {string} meetupId
   * @returns {Observable<MeetupRequest[]>}
   */
  loadRequests(meetupId: string): Observable<MeetupRequest[]> {
    throw new Error('Method not implemented.');
  }

  /**
   * Es wird nur der Request, nicht aber der User oder das Meetup aktualisiert.
   */
  updateRequest(request: MeetupRequest): Observable<MeetupRequest> {
    throw new Error('Method not implemented.');
  }

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    throw new Error('Method not implemented.');
  }
}
