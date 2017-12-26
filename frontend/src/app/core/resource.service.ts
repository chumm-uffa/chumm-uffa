import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import {ILoginRequest, IRegisterResponse, ILoginResponse, IRegisterRequest,
  User, Chat, Meetup, MeetupRequest, Version} from '@chumm-uffa/interface';
import {SearchDto} from '../../../../interface/src/model/searchDto';

/**
 * Resource service interface
 */
export interface ResourceServiceInterface {
  checkAlive(): Observable<string>;

  newAlive(): Observable<string>;

  register(request: IRegisterRequest): Observable<IRegisterResponse>;

  login(request: ILoginRequest): Observable<ILoginResponse>;

  getMeetUps(user: User): Observable<Meetup[]>;

  getMeetUpRequests(user: User): Observable<MeetupRequest[]>;

  loadMeetup(meetupId: string): Observable<Meetup>;

  loadRequests(meetupId: string): Observable<MeetupRequest[]>;

  updateRequest(request: MeetupRequest): Observable<MeetupRequest>;

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]>;

  createChat(chat: Chat): void;

  searchMeetup(searchDto: SearchDto): Observable<Meetup[]>;

  requestForParticipation(meetupId: string): Observable<boolean>;

  deleteMeetup(meetupId: string): Observable<boolean>;

  deleteRequest(requestId: string): Observable<boolean>;

  saveUser(user: User): Observable<any>;
}

/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */
@Injectable()
export class ResourceService implements ResourceServiceInterface {

  private urlDemo = `http://localhost:4200/api/${Version}/`;

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
   * Register a new user
   * @param {User} user
   * @returns {Observable<User>}
   */
  register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(this.urlDemo + 'auth/register', request);
  }

  /**
   * Login the email using the password
   * @param {ILoginRequest} request
   * @returns {Observable<ILoginResponse>}
   */
  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.urlDemo + 'auth/login', request);
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

  createChat(chat: Chat): void {
    throw new Error('Method not implemented.');
  }

  searchMeetup(searchDto: SearchDto): Observable<Meetup[]> {
    throw new Error('Method not implemented.');
  }

  requestForParticipation(meetupId: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteMeetup(meetupId: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteRequest(requestId: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  /**
   * Register a new user
   * @param {User} user
   * @returns {Observable<User>}
   */
  saveUser(user: User): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
