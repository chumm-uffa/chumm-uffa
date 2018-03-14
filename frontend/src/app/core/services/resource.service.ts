import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import {
  ICreateChatForMeetupRequest,
  ICreateChatForMeetupResponse,
  ICreateMeetupRequest,
  ICreateMeetupRequestRequest,
  ICreateMeetupRequestResponse,
  ICreateMeetupResponse,
  IDeleteMeetupRequestResponse,
  IDeleteMeetupResponse,
  IGetAllChatsForMeetupResponse,
  IGetAllHallsResponse,
  IGetAllMeetupsForUserResponse,
  IGetAllRequestsForMeetupResponse,
  IGetAllRequestsForUserResponse,
  IGetMeetupResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
  ISearchMeetupsRequest,
  ISearchMeetupsResponse,
  IUpdateMeetupRequest,
  IUpdateMeetupRequestRequest,
  IUpdateMeetupRequestResponse,
  IUpdateMeetupResponse,
  IUpdatePasswordRequest,
  IUpdatePasswordResponse,
  IUpdateProfileRequest,
  IUpdateProfileResponse,
  User,
  Meetup,
  Version
} from '@chumm-uffa/interface';
import {AppStateService} from './app-state.service';

/**
 * Resource service interface
 */
export interface ResourceServiceInterface {
  register(request: IRegisterRequest): Observable<IRegisterResponse>;

  saveUser(user: IUpdateProfileRequest): Observable<IUpdateProfileResponse>;

  login(request: ILoginRequest): Observable<ILoginResponse>;


  createMeetup(request: ICreateMeetupRequest): Observable<ICreateMeetupResponse>;

  saveMeetup(request: IUpdateMeetupRequest): Observable<IUpdateMeetupResponse>;

  getMeetups(userId: string): Observable<IGetAllMeetupsForUserResponse>;

  getMeetupRequests(userId: string): Observable<IGetAllRequestsForUserResponse>;

  loadMeetup(meetupId: string): Observable<IGetMeetupResponse>;

  searchMeetup(request: ISearchMeetupsRequest): Observable<ISearchMeetupsResponse>;

  deleteMeetup(meetupId: string): Observable<IDeleteMeetupResponse>;

  loadRequests(meetupId: string): Observable<IGetAllRequestsForMeetupResponse>;

  createMeetupRequest(request: ICreateMeetupRequestRequest): Observable<ICreateMeetupRequestResponse>;

  updateRequest(request: IUpdateMeetupRequestRequest): Observable<IUpdateMeetupRequestResponse>;

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse>;

  createChat(meetupId: string, request: ICreateChatForMeetupRequest): Observable<ICreateChatForMeetupResponse>;

  loadChatsByMeetupId(meetupId: string): Observable<IGetAllChatsForMeetupResponse>;

  getHalls(): Observable<IGetAllHallsResponse>;

  updatePassword(request: IUpdatePasswordRequest): Observable<IUpdatePasswordResponse>;

  getNewTicker(): Observable<Meetup[]>;
}

/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */
@Injectable()
export class ResourceService implements ResourceServiceInterface {

  private urlRestBackend = `/api/${Version}/`;

  constructor(private appState: AppStateService,
              private http: HttpClient) {
  }

  /**
   * Register a new user profile
   * @param {User} user
   * @returns {Observable<User>}
   */
  register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(this.urlRestBackend + 'auth/register', request);
  }

  /**
   * Save the changes of user profile
   * @param {User} user
   * @returns {Observable<any>}
   */
  saveUser(request: IUpdateProfileRequest): Observable<IUpdateProfileResponse> {
    return this.http.put<IUpdateProfileResponse>(this.urlRestBackend + 'auth/profile', request);
  }

  /**
   * Login the user
   * @param {ILoginRequest} request
   * @returns {Observable<ILoginResponse>}
   */
  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.urlRestBackend + 'auth/login', request);
  }


  /**
   * Creates a new meetup
   * @param {ICreateMeetupRequest} request
   * @returns {Observable<ICreateMeetupResponse>}
   */
  createMeetup(request: ICreateMeetupRequest): Observable<ICreateMeetupResponse> {
    return this.http.post<ICreateMeetupResponse>(this.urlRestBackend + 'meetups', request);
  }

  /**
   * Saves the changed meetup
   * @param {IUpdateMeetupRequest} request
   * @returns {Observable<IUpdateMeetupResponse>}
   */
  saveMeetup(request: IUpdateMeetupRequest): Observable<IUpdateMeetupResponse> {
    return this.http.put<IUpdateMeetupResponse>(`${this.urlRestBackend}meetups/${request.meetup.id}`, request);
  }

  /**
   * Gets all meetups for the given user
   * @param {User} user
   * @returns {Observable<>}
   */
  getMeetups(userId: string): Observable<IGetAllMeetupsForUserResponse> {
    return this.http.get<IGetAllMeetupsForUserResponse>(`${this.urlRestBackend}users/${userId}/meetups`);
  }

  /**
   * Deletes a meetup
   * @param {string} meetupId
   * @returns {Observable<IDeleteMeetupResponse>}
   */
  deleteMeetup(meetupId: string): Observable<IDeleteMeetupResponse> {
    return this.http.delete<IDeleteMeetupResponse>(`${this.urlRestBackend}meetups/${meetupId}`);
  }

  /**
   * Gets all meetup-requests for the user
   * @param {User} user
   * @returns {Observable<IGetAllRequestsForMeetupResponse>}
   */
  getMeetupRequests(userId: string): Observable<IGetAllRequestsForUserResponse> {
    return this.http.get<IGetAllRequestsForUserResponse>(`${this.urlRestBackend}users/${userId}/meetup-requests`);
  }

  loadMeetup(meetupId: string): Observable<IGetMeetupResponse> {
    return this.http.get<IGetMeetupResponse>(`${this.urlRestBackend}meetups/${meetupId}`);
  }

  /**
   * Gets all meetup-request for a meetup
   * @param {string} meetupId
   * @returns {Observable<IGetAllRequestsForMeetupResponse>}
   */
  loadRequests(meetupId: string): Observable<IGetAllRequestsForMeetupResponse> {
    return this.http.get<IGetAllRequestsForMeetupResponse>(`${this.urlRestBackend}meetups/${meetupId}/meetup-requests`);
  }

  /**
   * Updates a meetup request
   * @param {IUpdateMeetupRequestRequest} request
   * @returns {Observable<IUpdateMeetupRequestResponse>}
   */
  updateRequest(request: IUpdateMeetupRequestRequest): Observable<IUpdateMeetupRequestResponse> {
    return this.http.put<IUpdateMeetupRequestResponse>(this.urlRestBackend + `meetup-requests/${request.request.id}`, request);
  }

  /**
   * Gets the chats of the given meetup
   * @param {string} meetupId
   * @returns {Observable<IGetAllChatsForMeetupResponse>}
   */
  loadChatsByMeetupId(meetupId: string): Observable<IGetAllChatsForMeetupResponse> {
    return this.http.get<IGetAllChatsForMeetupResponse>(`${this.urlRestBackend}meetups/${meetupId}/chats`);
  }

  /**
   * Creates a new chat entry for a meetup
   * @param {string} meetupId
   * @param {ICreateChatForMeetupRequest} request
   * @returns {Observable<ICreateChatForMeetupResponse>}
   */
  createChat(meetupId: string, request: ICreateChatForMeetupRequest): Observable<ICreateChatForMeetupResponse> {
    return this.http.post<ICreateChatForMeetupResponse>(`${this.urlRestBackend}meetups/${meetupId}/chats`, request);
  }

  /**
   * Search for meetups
   * @param {ISearchMeetupsRequest} request
   * @returns {Observable<ISearchMeetupsResponse>}
   */
  searchMeetup(request: ISearchMeetupsRequest): Observable<ISearchMeetupsResponse> {
    return this.http.post<ISearchMeetupsResponse>(this.urlRestBackend + `meetups/search`, request);
  }

  /**
   * Creates a new meetup-request
   * @param {ICreateMeetupRequestRequest} request
   * @returns {Observable<ICreateMeetupRequestResponse>}
   */
  createMeetupRequest(request: ICreateMeetupRequestRequest): Observable<ICreateMeetupRequestResponse> {
    return this.http.post<ICreateMeetupRequestResponse>(this.urlRestBackend + 'meetup-requests', request);
  }

  /**
   * Deletes a meetup request
   * @param {string} requestId
   * @returns {Observable<IDeleteMeetupRequestResponse>}
   */
  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    return this.http.delete<ICreateMeetupRequestResponse>(`${this.urlRestBackend}meetup-requests/${requestId}`);
  }

  /**
   * Get all available halls
   * @returns {Observable<IGetAllHallsResponse>}
   */
  getHalls(): Observable<IGetAllHallsResponse> {
    return this.http.get<IGetAllHallsResponse>(this.urlRestBackend + 'halls');
  }

  /**
   *
   * @param {IUpdatePasswordRequest} request
   * @returns {Observable<IUpdatePasswordResponse>}
   */
  updatePassword(request: IUpdatePasswordRequest): Observable<IUpdatePasswordResponse> {
    return this.http.put<IUpdatePasswordResponse>(this.urlRestBackend + 'auth/password', request);
  }

  getNewTicker(): Observable<Meetup[]> {
    throw new Error('not yet implemented');
  }
}
