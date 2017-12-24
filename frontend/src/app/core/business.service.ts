import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ResourceService} from './resource.service';
import {MockService} from './mock.service';
import {AppStateService} from './app-state.service';
import {ILoginRequest, IRegisterResponse, ILoginResponse, IRegisterRequest, createLoginRequest,
        User, Hall, Chat, Meetup, MeetupRequest} from '@chumm-uffa/interface';
import {SearchDto} from './model/searchDto';

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

  checkAlive(): Observable<string> {import {SearchDto} from './model/searchDto';
    return this.mockService.checkAlive();
  }

  /**
   *
   * @param {IRegisterRequest} request
   * @returns {Observable<IRegisterResponse>}
   */
  register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.resourceService.register(request);
  }

  /**
   * Login the username
   * @param {ILoginRequest} request
   * @returns {Observable<ILoginResponse>}
   */
  login(user: User): Observable<ILoginResponse> {
    return this.resourceService.login(createLoginRequest(user));
  }

  /**
   * Retruns all meetups for the current logged in user
   * @returns {Observable<Meetup[]>}
   */import {SearchDto} from './model/searchDto';
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
    this.resourceServiceimport {SearchDto} from './model/searchDto';.saveMeetup(meetup);
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

  searchMeetUp(searchDto: SearchDto): Observable<Meetup[]> {
    return this.mockService.searchMeetup(searchDto);
  }

  requestForParticipation(meetupId: string): Observable<boolean> {
    return this.mockService.requestForParticipation(meetupId);
  }

  deleteMeetup(meetupId: string): Observable<boolean> {
    return this.mockService.deleteMeetup(meetupId);
  }
}

