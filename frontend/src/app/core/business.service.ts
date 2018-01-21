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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('register failed, ', response.message);
        return observer.error(response.message);
      });
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
        }, err => {
        const response: IBaseResponse = err.error;
        console.log('user profile update failed, ', response.message);
        return observer.error(response.message);
      });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while login, ', response.message);
        return observer.error(response.message);
      });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while getting all meetups, ', response.message);
        return observer.error(response.message);
      });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while getting all requests for meetup, ', response.message);
        return observer.error(response.message);
      });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while create new meetup, ', response.message);
        return observer.error(response.message);
      });
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
        }, err => {
          const response: IBaseResponse = err.error;
          console.log('error while save existing meetup, ', response.message);
          return observer.error(response.message);
        });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while load meetup, ', response.message);
        return observer.error(response.message);
      });
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
        }, err => {
          const response: IBaseResponse = err.error;
          console.log('error while delete meetup, ', response.message);
          return observer.error(response.message);
      });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while load requests, ', response.message);
        return observer.error(response.message);
      });
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
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error update meetup request, ', response.message);
        return observer.error(response.message);
      });
    });
  }

  requestForParticipation(meetup: Meetup): Observable<MeetupRequest> {
    return Observable.create( (observer) => {
      const request = MeetupRequestsFactory.createCreateMeetupRequestRequest(new MeetupRequest(null, this.appState.loggedInUser, meetup));
      this.resourceService.createMeetupRequest(request)
      .subscribe( res => {
        observer.next(res.request);
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while create new meetup request, ', response.message);
        return observer.error(response.message);
      });
    });

  }

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    return Observable.create( (observer) => {
      this.resourceService.deleteRequest(requestId)
      .subscribe( () => {
        observer.next();
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while delete request, ', response.message);
        return observer.error(response.message);
      });
    });
  }

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    return Observable.create( (observer) => {
      this.resourceService.loadChatsByMeetupId(meetupId)
      .subscribe( res => {
        observer.next(Chat.fromJSONArray(res.chats));
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while load chats for meetup, ', response.message);
        return observer.error(response.message);
      });
    });

  }

  createChat(message: string, meetupId: string): Observable<Chat> {
    return Observable.create( (observer) => {
      const chat = MeetupsFactory.createCreateChatForMeetupRequest(new Chat('', message, this.appState.loggedInUser, new Date()));
      this.resourceService.createChat(meetupId, chat)
      .subscribe( res => {
        observer.next(res.chat);
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while create chat, ', response.message);
        return observer.error(response.message);
      });
    });
  }

  searchMeetUp(searchDto: SearchDto): Observable<Meetup[]> {
    return Observable.create( (observer) => {
      const search = MeetupsFactory.createSearchMeetupRequest(searchDto);
      this.resourceService.searchMeetup(search)
      .subscribe( res => {
        observer.next(Meetup.fromJSONArray(res.meetups));
      }, err => {
        const response: IBaseResponse = err.error;
        console.log('error while login, ', response.message);
        return observer.error(response.message);
      });
    });
  }

  /**
   * @returns {Observable<Hall[]>}
   */
  getHalls(): Observable<Hall[]> {
    return Observable.create( (observer) => {
      this.resourceService.getHalls().subscribe(res => {
        observer.next(Hall.fromJSONArray(res.halls));
      });
    });
  }
}

