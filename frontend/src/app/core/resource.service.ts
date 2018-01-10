import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import {
  Chat,
  ICreateMeetupRequestRequest,
  ICreateMeetupRequestResponse,
  IDeleteMeetupRequestResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  IUpdateMeetupRequestRequest,
  IUpdateMeetupRequestResponse,
  IUpdateProfileRequest,
  IUpdateProfileResponse,
  Meetup,
  MeetupRequest,
  SearchDto,
  User,
  Version
} from '@chumm-uffa/interface';
import {AppStateService} from './app-state.service';


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

  updateRequest(request: IUpdateMeetupRequestRequest): Observable<IUpdateMeetupRequestResponse>;

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]>;

  createChat(chat: Chat): void;

  searchMeetup(searchDto: SearchDto): Observable<Meetup[]>;

  createMeetupRequest(request: ICreateMeetupRequestRequest): Observable<ICreateMeetupRequestResponse>;

  deleteMeetup(meetupId: string): Observable<boolean>;

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse>;

  saveUser(user: IUpdateProfileRequest): Observable<IUpdateProfileResponse>;
}

/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */
@Injectable()
export class ResourceService implements ResourceServiceInterface {

  private urlDemo = `/api/${Version}/`;

  constructor(private appState: AppStateService,
              private http: HttpClient) {
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
   * Register a new user profile
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
  updateRequest(request: IUpdateMeetupRequestRequest): Observable<IUpdateMeetupRequestResponse> {
    return this.http.put<IUpdateMeetupRequestResponse>(this.urlDemo + `meetup-requests/${request.request.id}`, request);
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

  createMeetupRequest(request: ICreateMeetupRequestRequest): Observable<ICreateMeetupRequestResponse> {
    return this.http.post<ICreateMeetupRequestResponse>(this.urlDemo + 'meetup-requests', request);
  }

  deleteMeetup(meetupId: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    return this.http.delete<ICreateMeetupRequestResponse>(`${this.urlDemo}meetup-requests/${requestId}`);
  }

  /**
   * Save the changes of user profile
   * @param {User} user
   * @returns {Observable<any>}
   */
  saveUser(request: IUpdateProfileRequest): Observable<IUpdateProfileResponse> {
    return this.http.put<IUpdateProfileResponse>(this.urlDemo + 'auth/profile', request);
  }
}
