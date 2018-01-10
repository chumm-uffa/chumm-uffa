import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ResourceService} from './resource.service';
import {MockService} from './mock.service';
import {AppStateService} from './app-state.service';
import {
  AuthFactory,
  Chat,
  Hall,
  IDeleteMeetupRequestResponse,
  ILoginResponse,
  IRegisterResponse,
  ISearchMeetupsRequest,
  ISearchMeetupsResponse,
  IUpdateMeetupRequestResponse,
  IUpdateProfileResponse,
  Meetup,
  MeetupRequest,
  MeetupRequestsFactory,
  MeetupsFactory,
  RequestStatus,
  SearchDto,
  User
} from '@chumm-uffa/interface';


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
   *
   * @param {User} user
   * @returns {Observable<IRegisterResponse>}
   */
  register(user: User): Observable<IRegisterResponse> {
    return this.resourceService.register(AuthFactory.createRegisterRequest(user));
  }

  /**
   *
   * @param {User} user
   * @returns {Observable<IRegisterResponse>}
   */
  saveUser(user: User): Observable<IUpdateProfileResponse> {
    return this.resourceService.saveUser(AuthFactory.createUpdateProfileRequest(user));
  }

  /**
   *
   * @param {User} user
   * @returns {Observable<ILoginResponse>}
   */
  login(user: User): Observable<ILoginResponse> {
    return this.resourceService.login(AuthFactory.createLoginRequest(user));
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

  updateRequest(request: MeetupRequest, state: RequestStatus): Observable<IUpdateMeetupRequestResponse> {
    const mr = JSON.parse(JSON.stringify(request));
    mr.status = state;
    return this.resourceService.updateRequest(MeetupRequestsFactory.createUpdateMeetupRequestRequest(mr));
  }

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    return this.mockService.loadChatsByMeetupId(meetupId);
  }

  createChat(message: string, meetupId: string): Chat {
    const newOne = new Chat('99', message, this.appState.loggedInUser, new Date());
    this.mockService.createChat(newOne);
    return newOne;
  }

  searchMeetUp(searchDto: SearchDto): Observable<ISearchMeetupsResponse> {
    const request = MeetupsFactory.createSearchMeetupRequest(searchDto);
    return this.resourceService.searchMeetup(request);
  }

  requestForParticipation(meetup: Meetup): Observable<IDeleteMeetupRequestResponse> {
    const request = MeetupRequestsFactory.createCreateMeetupRequestRequest(new MeetupRequest(null, this.appState.loggedInUser, meetup));
    return this.resourceService.createMeetupRequest(request);
  }

  deleteMeetup(meetupId: string): Observable<boolean> {
    return this.mockService.deleteMeetup(meetupId);
  }

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    return this.resourceService.deleteRequest(requestId);
  }
}

