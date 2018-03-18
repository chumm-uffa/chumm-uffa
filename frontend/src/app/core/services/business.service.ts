import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ResourceService} from './resource.service';
import {MockService} from './mock.service';
import {AppStateService} from './app-state.service';
import {
  AuthFactory,
  BaseResponse,
  Chat,
  Hall,
  IBaseResponse,
  IDeleteMeetupRequestResponse,
  IGetAllMeetupsForUserResponse,
  IGetMeetupResponse,
  IUpdateProfileResponse,
  Meetup,
  MeetupRequest,
  MeetupRequestsFactory,
  MeetupsFactory,
  RequestStatus,
  SearchDto,
  User
} from '@chumm-uffa/interface';
import {AppDialogService} from './app-dialog.service';
import {Spinner} from '../../material/spinner/spinner';
import {NotificationService} from './notification.service';


/**
 * Hier kann Businesslogik rein.
 * Aktuell wir hier der mock service verwenden. Sobald funktionen
 * auf dem Backend verfügbar sind kann anstelle des mock der Resourcen
 * Service verwendet werden.
 */
@Injectable()
export class BusinessService {

  private lastSearch: Meetup[] = [];

  constructor(private appState: AppStateService,
              private resourceService: ResourceService,
              private notificationService: NotificationService,
              private mockService: MockService,
              private appDialogService: AppDialogService) {
  }

  /**
   * Registers a new user profile
   * @param {User} user
   * @returns {Observable<User>}
   */
  register(user: User): Observable<User> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.register(AuthFactory.createRegisterRequest(user))
        .subscribe(res => {
          spinner.stop();
          observer.next(User.fromJSON(res.user));
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'register');
        });
    });
  }

  /**
   * Updates the current user profile
   * @param {User} user
   * @returns {Observable<IUpdateProfileResponse>}•••••••••••
   */
  saveUser(user: User): Observable<IUpdateProfileResponse> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.saveUser(AuthFactory.createUpdateProfileRequest(user))
        .subscribe(res => {
          spinner.stop();
          observer.next(User.fromJSON(res.profile));
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'update profile');
        });
    });
  }

  /**
   * Login
   * @param {User} user
   * @returns {Observable<User>}
   */
  login(user: User): Observable<User> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    this.lastSearch = [];
    return Observable.create((observer) => {
      this.resourceService.login(AuthFactory.createLoginRequest(user))
        .subscribe(res => {
          spinner.stop();
          this.appState.loggedInUser = res.profile;
          this.appState.token = res.token;
          observer.next(User.fromJSON(res.profile));
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'login');
        });
    });
  }

  /**
   * Logout
   */
  logout(): void {
    this.appState.token = null;
    this.appState.loggedInUser = null;
    this.notificationService.disconnect();
  }

  /**
   * Retruns all meetups for the current logged in user
   * @returns {Observable<IGetAllMeetupsForUserResponse>}
   */
  getMeetUps(): Observable<Meetup[]> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.getMeetups(this.appState.loggedInUser.id)
        .subscribe(res => {
            spinner.stop();
            observer.next(Meetup.fromJSONArray(res.meetups));
            observer.complete();
          }, err => {
            spinner.stop();
            this.handleError(observer, err, 'getting all meetups');
          }
        );
    });
  }

  /**
   * Returns all meetupRequests for the current logged in user
   * @returns {Observable<MeetupRequest[]>}
   */
  getMeetUpRequests(): Observable<MeetupRequest[]> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.getMeetupRequests(this.appState.loggedInUser.id)
        .subscribe(res => {
          spinner.stop();
          observer.next(MeetupRequest.fromJSONArray(res.requests));
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'getting all requests for meetup');
        });
    });
  }

  /**
   * Creates a new meetup
   * @param {Meetup} meetup
   * @returns {Observable<Meetup>}
   */
  createMeetUp(meetup: Meetup): Observable<Meetup> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      meetup.owner = this.appState.loggedInUser;
      this.resourceService.createMeetup(MeetupsFactory.createCreateMeetupRequest(meetup))
        .subscribe(res => {
          spinner.stop();
          observer.next(res.meetup);
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'create new meetup');
        });
    });
  }

  /**
   * Updates an existing meetup
   * @param {Meetup} meetup
   * @returns {Observable<IBaseResponse>}
   */
  saveMeetUp(meetup: Meetup): Observable<Meetup> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.saveMeetup(MeetupsFactory.createUpdateMeetupRequest(meetup))
        .subscribe(res => {
          spinner.stop();
          observer.next(res.meetup);
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'update meetup');
        });
    });
  }

  /**
   * Loads a meetup
   * @param {string} meetupId
   * @returns {Observable<IGetMeetupResponse>}
   */
  loadMeetup(meetupId: string): Observable<Meetup> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.loadMeetup(meetupId)
        .subscribe(res => {
          spinner.stop();
          observer.next(res.meetup);
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'load meetup');
        });
    });
  }

  /**
   * Deletes a meetup
   * @param {string} meetupId
   * @returns {Observable<void>}
   */
  deleteMeetup(meetupId: string): Observable<void> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.deleteMeetup(meetupId)
        .subscribe(() => {
          spinner.stop();
          observer.next();
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'delete meetup');
        });
    });
  }

  /**
   * Loads all request for a meetup
   * @param {string} meetupId
   * @returns {Observable<MeetupRequest[]>}
   */
  loadRequests(meetupId: string): Observable<MeetupRequest[]> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.loadRequests(meetupId)
        .subscribe(res => {
          spinner.stop();
          observer.next(MeetupRequest.fromJSONArray(res.requests));
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'load meetup request');
        });
    });
  }

  /**https://www.typescriptlang.org/docs/handbook/advanced-types.html
   * Upates a request
   * @param {MeetupRequest} request
   * @param {RequestStatus} state
   * @returns {Observable<MeetupRequest>}
   */
  updateRequest(request: MeetupRequest, state: RequestStatus): Observable<MeetupRequest> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      request.status = state;
      this.resourceService.updateRequest(MeetupRequestsFactory.createUpdateMeetupRequestRequest(request))
        .subscribe(res => {
          spinner.stop();
          observer.next(res.request);
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'update meetup request');
        });
    });
  }

  /**
   * Add meetup-request to given meetup
   * @param {Meetup} meetup
   * @returns {Observable<MeetupRequest>}
   */
  requestForParticipation(meetup: Meetup): Observable<MeetupRequest> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      const request = MeetupRequestsFactory.createCreateMeetupRequestRequest(new MeetupRequest(null, this.appState.loggedInUser, meetup));
      this.resourceService.createMeetupRequest(request)
        .subscribe(res => {
          spinner.stop();
          observer.next(res.request);
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'create meetup request');
        });
    });
  }

  /**
   * Deletes a meetup-request
   * @param {string} requestId
   * @returns {Observable<IDeleteMeetupRequestResponse>}
   */
  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.deleteRequest(requestId)
        .subscribe(() => {
          spinner.stop();
          observer.next();
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'delete meetup request');
        });
    });
  }

  /**
   * Loads all chats for a meetup
   * @param {string} meetupId
   * @returns {Observable<Chat[]>}
   */
  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    /*aufgrund des Polling bei meetupdetail hier kein Spinner*/
    return Observable.create((observer) => {
      this.resourceService.loadChatsByMeetupId(meetupId)
        .subscribe(res => {
          observer.next(Chat.fromJSONArray(res.chats));
          observer.complete();
        }, err => {
          this.handleError(observer, err, 'load chats for meetup');
        });
    });
  }

  /**
   * Creates a new chat for a meetup
   * @param {string} message
   * @param {string} meetupId
   * @returns {Observable<Chat>}
   */
  createChat(message: string, meetupId: string): Observable<Chat> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      const chat = MeetupsFactory.createCreateChatForMeetupRequest(new Chat('', message, this.appState.loggedInUser, new Date()));
      this.resourceService.createChat(meetupId, chat)
        .subscribe(res => {
          spinner.stop();
          observer.next(res.chat);
          observer.complete();
        }, err => {
          this.handleError(observer, err, 'create chats for meetup');
          spinner.stop();
        });
    });
  }

  /**
   * Search for meetups
   * @param {SearchDto} searchDto
   * @returns {Observable<Meetup[]>}
   */
  searchMeetUp(searchDto: SearchDto): Observable<Meetup[]> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      const search = MeetupsFactory.createSearchMeetupRequest(searchDto);
      this.resourceService.searchMeetup(search)
        .subscribe(res => {
          spinner.stop();
          this.lastSearch = Meetup.fromJSONArray(res.meetups);
          observer.next(this.lastSearch);
          observer.complete();
        }, err => {
          spinner.stop();
          this.handleError(observer, err, 'search meetup');
        });
    });
  }

  getCachedSearchResults() {
    return this.lastSearch;
  }

  /**
   * Gets all available halls
   * @returns {Observable<Hall[]>}
   */
  getHalls(): Observable<Hall[]> {
    const spinner: Spinner = new Spinner(this.appDialogService);
    return Observable.create((observer) => {
      this.resourceService.getHalls().subscribe(res => {
        spinner.stop();
        observer.next(Hall.fromJSONArray(res.halls));
        observer.complete();
      }, err => {
        spinner.stop();
        this.handleError(observer, err, 'getting all halls');
      });
    });
  }

  /**
   *
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Observable<any>}
   */
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return Observable.create((observer) => {
      const request = AuthFactory.createUpdatePasswordRequest(oldPassword, newPassword);
      this.resourceService.updatePassword(request).subscribe(res => {
        observer.next();
        observer.complete();
      }, err => this.handleError(observer, err, 'change password'));
    });
  }

  getNewsTickers(): Observable<Meetup[]> {
    return Observable.create((observer) => {
      this.resourceService.getNewsTicker().subscribe(res => {
            observer.next(Meetup.fromJSONArray(res.meetups));
            observer.complete();
          }, err => {
            this.handleError(observer, err, 'getting new ticker');
          }
        );
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
    observer.complete();
  }
}
