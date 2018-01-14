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
  IGetAllHallsResponse,
  IGetAllMeetupsForUserResponse,
  IGetAllRequestsForMeetupResponse,
  IGetAllChatsForMeetupResponse,
  IGetMeetupResponse,
  IDeleteMeetupResponse,
  ICreateMeetupRequestResponse,
  ICreateChatForMeetupResponse,
  IBaseResponse,
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
   * @returns {Observable<IRegisterResponse>}•••••••••••
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
  getMeetUps(): Observable<IGetAllMeetupsForUserResponse> {
    return this.resourceService.getMeetups(this.appState.loggedInUser);
  }

  /**
   * Returns all participant for the current logged in user
   * @returns {Observable<MeetupRequest[]>}
   */
  getMeetUpRequests(): Observable<IGetAllRequestsForMeetupResponse> {
    return this.resourceService.getMeetupRequests(this.appState.loggedInUser);
  }

  saveMeetUp(meetup: Meetup): Observable<IBaseResponse> {
    if (!meetup.owner) {
      meetup.owner = this.appState.loggedInUser;
    }
    // if no meetup id is available, create a new one.
    if (meetup.id) {
      return this.resourceService.saveMeetup(MeetupsFactory.createUpdateMeetupRequest(meetup));
    } else {
      return this.resourceService.createMeetup(MeetupsFactory.createCreateMeetupRequest(meetup));
    }
  }

  loadMeetup(meetupId: string): Observable<IGetMeetupResponse> {
    return this.resourceService.loadMeetup(meetupId);
  }

  deleteMeetup(meetupId: string): Observable<IDeleteMeetupResponse> {
    return this.resourceService.deleteMeetup(meetupId);
  }

  loadRequests(meetupId: string): Observable<IGetAllRequestsForMeetupResponse> {
    return this.resourceService.loadRequests(meetupId);
  }

  updateRequest(request: MeetupRequest, state: RequestStatus): Observable<IUpdateMeetupRequestResponse> {
    const mr = JSON.parse(JSON.stringify(request));
    mr.status = state;
    return this.resourceService.updateRequest(MeetupRequestsFactory.createUpdateMeetupRequestRequest(mr));
  }

  requestForParticipation(meetup: Meetup): Observable<ICreateMeetupRequestResponse> {
    const request = MeetupRequestsFactory.createCreateMeetupRequestRequest(new MeetupRequest(null, this.appState.loggedInUser, meetup));
    return this.resourceService.createMeetupRequest(request);
  }

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    return this.resourceService.deleteRequest(requestId);
  }

  loadChatsByMeetupId(meetupId: string): Observable<IGetAllChatsForMeetupResponse> {
    return this.resourceService.loadChatsByMeetupId(meetupId);
  }

  createChat(message: string, meetupId: string): Observable<ICreateChatForMeetupResponse> {
    const request = MeetupsFactory.createCreateChatForMeetupRequest(new Chat('', message, this.appState.loggedInUser, new Date()));
    return this.resourceService.createChat(meetupId, request);
  }

  searchMeetUp(searchDto: SearchDto): Observable<ISearchMeetupsResponse> {
    const request = MeetupsFactory.createSearchMeetupRequest(searchDto);
    return this.resourceService.searchMeetup(request);
  }

  /**
   * @returns {Observable<Hall[]>}
   */
  getHalls(): Observable<IGetAllHallsResponse> {
    return this.resourceService.getHalls();
  }
}

