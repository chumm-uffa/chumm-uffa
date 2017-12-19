import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ResourceService} from './resource.service';
import {Meetup} from './model/meetup';
import {MockService} from './mock.service';
import {AppStateService} from './app-state.service';
import {MeetupRequest} from './model/meetup-request';
import {Hall} from './model/hall';
import {User} from './model/user';
import {Chat} from './model/chat';

/**
 * Hier kann Businesslogik rein.
 * Aktuell wir hier der mock service verwenden. Sobald funktionen
 * auf dem Backend verfügbar sind kann anstelle des mock der Resourcen
 * Service verwendet werden.
 */
@Injectable()
export class BusinessService {

  constructor(private appState: AppStateService,
              private resourceService: ResourceService,
              private mockService: MockService) {
  }

  checkAlive(): Observable<string> {
    return this.mockService.checkAlive();
  }

  /**
   * Register the given user
   * @param {User} user
   */
  register(user: User): void {
    this.resourceService.saveUser(user).subscribe( newUser => {
      this.appState.loggedInUser = newUser;
    });
  }

  /**
   * Login the username
   * @param {string} email
   * @param {string} password
   */
  login(email: string, password: string) {
    this.resourceService.login(email, password).subscribe( user => {
      this.appState.loggedInUser = user;
    });
  }

  /**
   * Retruns all meetups for the current logged in user
   * @returns {Observable<Meetup[]>}
   */
  getMeetUps(): Observable<Meetup[]> {
    return this.mockService.getMeetUps(this.appState.loggedInUser);
  }

  /**
   * Returns all participant for the current logged in user
   * @returns {Observable<MeetupRequest[]>}
   */
  getMeetUpRequests(): Observable<MeetupRequest[]> {
    return this.mockService.getMeetUpRequests(this.appState.loggedInUser);
  }

  /**
   * @returns {Observable<Hall[]>}
   */
  getHalls(): Observable<Hall[]> {
    return this.mockService.getHalls();
  }

  saveMeetUp(meetup: Meetup): void {
    if (!meetup.owner) {
      meetup.owner = this.appState.loggedInUser;
    }
    this.resourceService.saveMeetup(meetup);
  }

  loadMeetup(meetupId: string): Observable<Meetup> {
    return this.mockService.loadMeetup(meetupId);
  }

  loadRequests(meetupId: string): Observable<MeetupRequest[]> {
    return this.mockService.loadRequests(meetupId);
  }

  updateRequest(request: MeetupRequest): Observable<MeetupRequest> {
    return this.mockService.updateRequest(request);
  }

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    return this.mockService.loadChatsByMeetupId(meetupId);
  }

  createChat(message: string, meetupId: string): Chat {
    const newOne = new Chat(message, this.appState.loggedInUser, new Date());
    this.mockService.createChat(newOne);
    return newOne;
  }
}

