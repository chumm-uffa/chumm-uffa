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
  IUpdateProfileResponse,
  IGetAllMeetupsForUserResponse,
  IGetMeetupResponse,
  IBaseResponse,
  BaseResponse,
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
   * Registers a new user profile
   * @param {User} user
   * @returns {Observable<User>}
   */
  register(user: User): Observable<User> {
    return Observable.create( (observer) => {
      this.resourceService.register(AuthFactory.createRegisterRequest(user))
      .subscribe(res => {
        observer.next(User.fromJSON(res.user));
      }, err => this.handleError(observer, err, 'register'));
    });
  }

  /**
   * Updates the current user profile
   * @param {User} user
   * @returns {Observable<IUpdateProfileResponse>}•••••••••••
   */
  saveUser(user: User): Observable<IUpdateProfileResponse> {
    return Observable.create( (observer) => {
      this.resourceService.saveUser(AuthFactory.createUpdateProfileRequest(user))
      .subscribe( res => {
        observer.next(User.fromJSON(res.profile));
      }, err => this.handleError(observer, err, 'update profile'));
    });
  }

  /**
   * Login
   * @param {User} user
   * @returns {Observable<User>}
   */
  login(user: User): Observable<User> {
    return Observable.create( (observer) => {
      this.resourceService.login(AuthFactory.createLoginRequest(user))
      .subscribe( res => {
        this.appState.loggedInUser = res.profile;
        this.appState.token = res.token;
        observer.next(User.fromJSON(res.profile));
      }, err => this.handleError(observer, err, 'login'));
    });
  }


  /**
   * Retruns all meetups for the current logged in user
   * @returns {Observable<IGetAllMeetupsForUserResponse>}
   */
  getMeetUps(): Observable<Meetup[]> {
    return Observable.create( (observer) => {
      this.resourceService.getMeetups(this.appState.loggedInUser.id)
      .subscribe( res => {
        observer.next(Meetup.fromJSONArray(res.meetups));
      }, err => this.handleError(observer, err, 'getting all meetups'));
    });
  }

  /**
   * Returns all meetupRequests for the current logged in user
   * @returns {Observable<MeetupRequest[]>}
   */
  getMeetUpRequests(): Observable<MeetupRequest[]> {
    return Observable.create( (observer) => {
      this.resourceService.getMeetupRequests(this.appState.loggedInUser.id)
      .subscribe( res => {
        observer.next(MeetupRequest.fromJSONArray(res.requests));
      }, err => this.handleError(observer, err, 'getting all requests for meetup'));
    });
  }

  /**
   * Creates a new meetup
   * @param {Meetup} meetup
   * @returns {Observable<Meetup>}
   */
  createMeetUp(meetup: Meetup): Observable<Meetup> {
    return Observable.create( (observer) => {
      meetup.owner = this.appState.loggedInUser;
      this.resourceService.createMeetup(MeetupsFactory.createCreateMeetupRequest(meetup))
      .subscribe( res => {
        observer.next(res.meetup);
      }, err => this.handleError(observer, err, 'create new meetup'));
    });
  }

  /**
   * Updates an existing meetup
   * @param {Meetup} meetup
   * @returns {Observable<IBaseResponse>}
   */
  saveMeetUp(meetup: Meetup): Observable<Meetup> {
    return Observable.create( (observer) => {
      this.resourceService.saveMeetup(MeetupsFactory.createUpdateMeetupRequest(meetup))
      .subscribe( res => {
        observer.next(res.meetup);
      }, err => this.handleError(observer, err, 'update meetup'));
    });
  }

  /**
   * Loads a meetup
   * @param {string} meetupId
   * @returns {Observable<IGetMeetupResponse>}
   */
  loadMeetup(meetupId: string): Observable<Meetup> {
    return Observable.create( (observer) => {
      this.resourceService.loadMeetup(meetupId)
      .subscribe( res => {
        observer.next(res.meetup);
      }, err => this.handleError(observer, err, 'load meetup'));
    });
  }

  /**
   * Deletes a meetup
   * @param {string} meetupId
   * @returns {Observable<void>}
   */
  deleteMeetup(meetupId: string): Observable<void> {
    return Observable.create( (observer) => {
      this.resourceService.deleteMeetup(meetupId)
      .subscribe( () => {
          observer.next();
      }, err => this.handleError(observer, err, 'delete meetup'));
    });
  }

  /**
   * Loads all request for a meetup
   * @param {string} meetupId
   * @returns {Observable<MeetupRequest[]>}
   */
  loadRequests(meetupId: string): Observable<MeetupRequest[]> {
    return Observable.create( (observer) => {
      this.resourceService.loadRequests(meetupId)
      .subscribe( res => {
        observer.next(MeetupRequest.fromJSONArray(res.requests));
      }, err => this.handleError(observer, err, 'load meetup request'));
    });
  }

  /**
   * Upates a request
   * @param {MeetupRequest} request
   * @param {RequestStatus} state
   * @returns {Observable<MeetupRequest>}
   */
  updateRequest(request: MeetupRequest, state: RequestStatus): Observable<MeetupRequest> {
    return Observable.create( (observer) => {
      request.status = state;
      this.resourceService.updateRequest(MeetupRequestsFactory.createUpdateMeetupRequestRequest(request))
      .subscribe( res => {
        observer.next(res.request);
      }, err => this.handleError(observer, err, 'update meetup request'));
    });
  }

  /**
   * Add meetup-request to given meetup
   * @param {Meetup} meetup
   * @returns {Observable<MeetupRequest>}
   */
  requestForParticipation(meetup: Meetup): Observable<MeetupRequest> {
    return Observable.create( (observer) => {
      const request = MeetupRequestsFactory.createCreateMeetupRequestRequest(new MeetupRequest(null, this.appState.loggedInUser, meetup));
      this.resourceService.createMeetupRequest(request)
      .subscribe( res => {
        observer.next(res.request);
      }, err => this.handleError(observer, err, 'create meetup request'));
    });
  }

  /**
   * Deletes a meetup-request
   * @param {string} requestId
   * @returns {Observable<IDeleteMeetupRequestResponse>}
   */
  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    return Observable.create( (observer) => {
      this.resourceService.deleteRequest(requestId)
      .subscribe( () => {
        observer.next();
      }, err => this.handleError(observer, err, 'delete meetup request'));
    });
  }

  /**
   * Loads all chats for a meetup
   * @param {string} meetupId
   * @returns {Observable<Chat[]>}
   */
  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    return Observable.create( (observer) => {
      this.resourceService.loadChatsByMeetupId(meetupId)
      .subscribe( res => {
        observer.next(Chat.fromJSONArray(res.chats));
      }, err => this.handleError(observer, err, 'load chats for meetup'));
    });
  }

  /**
   * Creates a new chat for a meetup
   * @param {string} message
   * @param {string} meetupId
   * @returns {Observable<Chat>}
   */
  createChat(message: string, meetupId: string): Observable<Chat> {
    return Observable.create( (observer) => {
      const chat = MeetupsFactory.createCreateChatForMeetupRequest(new Chat('', message, this.appState.loggedInUser, new Date()));
      this.resourceService.createChat(meetupId, chat)
      .subscribe( res => {
        observer.next(res.chat);
      }, err => this.handleError(observer, err, 'create chats for meetup'));
    });
  }

  /**
   * Search for meetups
   * @param {SearchDto} searchDto
   * @returns {Observable<Meetup[]>}
   */
  searchMeetUp(searchDto: SearchDto): Observable<Meetup[]> {
    return Observable.create( (observer) => {
      const search = MeetupsFactory.createSearchMeetupRequest(searchDto);
      this.resourceService.searchMeetup(search)
      .subscribe( res => {
        observer.next(Meetup.fromJSONArray(res.meetups));
      }, err => this.handleError(observer, err, 'search meetup'));
    });
  }

  /**
   * Gets all available halls
   * @returns {Observable<Hall[]>}
   */
  getHalls(): Observable<Hall[]> {
    return Observable.create( (observer) => {
      this.resourceService.getHalls().subscribe(res => {
        observer.next(Hall.fromJSONArray(res.halls));
      }, err => this.handleError(observer, err, 'getting all halls'));
    });
  }

  /**
   * Communication error handler
   * @param observer
   * @param err
   * @param {String} text
   */
  private handleError(observer, err, text: String) {
    let message: String = `Unexpected error while ${text}`;
    const response = BaseResponse.fromJSON(err.error);
    if (response.message) {
      message = `${message}: ${response.message}`;
    } else {
      message = `${message}: ${err.error}`;
    }
    observer.error(message);
  }
}
