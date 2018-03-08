import {Injectable} from '@angular/core';
import {ResourceServiceInterface} from './resource.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {
  AuthFactory,
  Chat,
  Hall,
  HallsFactory,
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
  Meetup,
  MeetupRequest,
  MeetupRequestsFactory,
  MeetupsFactory,
  RequestStatus,
  Sex,
  User,
  UsersFactory
} from '@chumm-uffa/interface';

/**
 * Mock for the resource service
 */
@Injectable()
export class MockService implements ResourceServiceInterface {

  private _users: User[];
  private _meetups: Meetup[];
  private _meetupRequest: MeetupRequest[];
  private _chats: Chat[];
  private _halls: Hall[];

  constructor() {
    this.generateUsers();
    this.generateMeetups();
    this.generateRequest();
    this.generateChats();
    this.generateHalls();
  }

  register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return of(AuthFactory.createRegisterResponse(true, '', this._users[0], '1'));
  }

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return of(AuthFactory.createLoginResponse(true, '', 'token', this._users[0]));
  }

  saveUser(request: IUpdateProfileRequest): Observable<IUpdateProfileResponse> {
    return of(AuthFactory.createUpdateProfileResponse(true, '', request.profile));
  }


  createMeetup(request: ICreateMeetupRequest): Observable<ICreateMeetupResponse> {
    return of(MeetupsFactory.createCreateMeetupResponse(true, '', request.meetup));
  }

  saveMeetup(request: IUpdateMeetupRequest): Observable<IUpdateMeetupResponse> {
    return of(MeetupsFactory.createUpdateMeetupRespons(true, '', request.meetup));
  }

  getMeetups(userId: string): Observable<IGetAllMeetupsForUserResponse> {
    return of(UsersFactory.createGetAllMeetupsForUserResponse(true, '',
      this._meetups.filter(meetup => meetup.owner.id === userId)));
  }

  getMeetupRequests(userId: string): Observable<IGetAllRequestsForMeetupResponse> {
    return of(UsersFactory.createGetAllRequestsForUserResponse(true, '', this._meetupRequest));
  }

  loadMeetup(meetupId: string): Observable<IGetMeetupResponse> {
    return of(MeetupsFactory.createGetMeetupRespons(true, '', this._meetups.find(mu => mu.id === meetupId)));
  }

  loadRequests(meetupId: string): Observable<IGetAllRequestsForMeetupResponse> {
    return of(MeetupsFactory.createGetAllRequestsForMeetupRespons(true, '', this._meetupRequest));
  }

  /**
   * Es wird nur der Request, nicht aber der User oder das Meetup aktualisiert.
   */
  updateRequest(request: IUpdateMeetupRequestRequest): Observable<IUpdateMeetupRequestResponse> {
    const mr = new MeetupRequest(request.request.id, request.request.participant, request.request.meetup, request.request.status);
    return of(MeetupRequestsFactory.createUpdateMeetupRequestResponse(true, '', mr));
  }

  loadChatsByMeetupId(meetupId: string): Observable<IGetAllChatsForMeetupResponse> {
    return of(MeetupsFactory.createGetAllChatsForMeetupRespons(true, '', [...this._chats]));
  }

  createChat(meetupId: string, request: ICreateChatForMeetupRequest): Observable<ICreateChatForMeetupResponse> {
    this._chats.push(request.chat);
    return of(MeetupsFactory.createCreateChatForMeetupRespons(true, '', request.chat, request.chat.id));
  }

  searchMeetup(request: ISearchMeetupsRequest): Observable<ISearchMeetupsResponse> {
    return of(MeetupsFactory.createSearchMeetupResponse(true, '', this._meetups));
  }

  createMeetupRequest(request: ICreateMeetupRequestRequest): Observable<ICreateMeetupRequestResponse> {
    return of(MeetupRequestsFactory.createCreateMeetupRequestResponse(true, ''));
  }

  deleteMeetup(meetupId: string): Observable<IDeleteMeetupResponse> {
    return of(MeetupsFactory.createDeleteMeetupRespons(true, ''));
  }

  deleteRequest(requestId: string): Observable<IDeleteMeetupRequestResponse> {
    this._meetupRequest = this._meetupRequest.filter(mu => mu.id !== requestId);
    return of(MeetupRequestsFactory.createDeleteMeetupRequestResponse(true, ''));
  }

  getHalls(): Observable<IGetAllHallsResponse> {
    return of(HallsFactory.createGetAllHallsResponse(true, '', this._halls));
  }

  updatePassword(request: IUpdatePasswordRequest): Observable<IUpdatePasswordResponse> {
    return of(AuthFactory.createUpdatePasswordResponse(true, ''));
  }

  get users(): User[] {
    return this._users;
  }

  private generateUsers() {
    this._users = [];
    this._users.push(new User('1', 'WilliCliffhanger', '12345678', Sex.MALE, '', '85'));
    this._users.push(new User('2', 'Eder', '12345678', Sex.FEMALE, '', '45'));
    this._users.push(new User('3', 'UrsChrumBei', '12345678', Sex.MALE, '', '72'));
    this._users.push(new User('4', 'PetraImmerBlau', '12345678', Sex.FEMALE, '', '85'));
    this._users.push(new User('5', 'pepe', '12345678', Sex.MALE, '', '85'));
  }

  /**
   * Generates meetups mock data
   */
  private generateMeetups() {
    this._meetups = [];
    this._meetups.push(new Meetup('id1', this._users[0], new Date(), new Date(), 'Out_1', '', 'fressa', 1, 2));
    this._meetups.push(new Meetup('id2', this._users[0], new Date(), new Date(), '', '2', 'saufa', 3, 4));
    this._meetups.push(new Meetup('id3', this._users[1], new Date(), new Date(), '', '16', '', 5, 6));
    this._meetups.push(new Meetup('id4', this._users[2], new Date(), new Date(), 'Out_2', '', '', 1, 2));
    this._meetups.push(new Meetup('id5', this._users[3], new Date(), new Date(), '', '12', '', 3, 4));
  }


  /**
   * Generates meetups mock data
   */
  private generateRequest() {
    this._meetupRequest = [];
    this._meetupRequest.push(new MeetupRequest('1', this._users[1], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest('2', this._users[2], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest('3', this._users[3], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest('4', this._users[0], this._meetups[2], RequestStatus.ACCEPT));
    this._meetupRequest.push(new MeetupRequest('5', this._users[1], this._meetups[2]));
    this._meetupRequest.push(new MeetupRequest('6', this._users[0], this._meetups[3], RequestStatus.DECLINED));
    this._meetupRequest.push(new MeetupRequest('7', this._users[3], this._meetups[3]));
    this._meetupRequest.push(new MeetupRequest('8', this._users[0], this._meetups[4]));
  }

  /**
   * Generates chat mock data
   */
  private generateChats() {
    this._chats = [];
    this._chats.push(new Chat('1', 'Arschgeige', this._users[1], new Date(2017, 8, 25, 12, 45)));
    this._chats.push(new Chat('2', 'hab dich auch lieb', this._users[2], new Date(2017, 9, 8, 14, 40)));
    this._chats.push(new Chat('3', 'wa wotsch', this._users[3], new Date(2017, 6, 15, 16, 5)));
    this._chats.push(new Chat('4', 'cha nöd', this._users[0], new Date(2017, 5, 6, 15, 5)));
    this._chats.push(new Chat('5', 'kei Bock', this._users[1], new Date(2017, 4, 5, 8, 4)));
    this._chats.push(new Chat('6', 'nöd gsicheret', this._users[0], new Date(2017, 2, 5, 10, 5)));
    this._chats.push(new Chat('7', 'freie Fall', this._users[3], new Date(2017, 11, 2, 2, 5)));
    this._chats.push(new Chat('8', 'we are the champignions', this._users[0], new Date(2017, 10, 2, 12, 42)));
  }

  /**
   * Generates halls mock data
   */
  private generateHalls() {
    this._halls = [];
    this._halls.push(new Hall('1', 'Adelboden - Freizeit- und Sportarena Adelboden'));
    this._halls.push(new Hall('2', 'Basel - Kletterhalle 7'));
    this._halls.push(new Hall('3', 'Biel - Crux-Bouldering'));
    this._halls.push(new Hall('4', 'Chur - Kletterhalle AP n Daun'));
    this._halls.push(new Hall('5', 'Davos - Kletterwand Davos'));
    this._halls.push(new Hall('6', 'Interlaken - K44 - Kletterhalle Interlaken'));
    this._halls.push(new Hall('7', 'küblis - kletterhalle küblis'));
    this._halls.push(new Hall('8', 'Küblis - Kletterhalle SAC Prättigau'));
    this._halls.push(new Hall('9', 'Langnau - Climbox'));
    this._halls.push(new Hall('10', 'Lenzburg - Kraftraktor'));
    this._halls.push(new Hall('11', 'Luzern - Kletterhalle Eiselin Luzern'));
    this._halls.push(new Hall('12', 'Meiringen - Kletterhalle Haslital'));
    this._halls.push(new Hall('13', 'Nidau BE - Sporttreff Ziehl AG'));
    this._halls.push(new Hall('14', 'Niederwangen - Magnet'));
    this._halls.push(new Hall('15', 'Näfels - Lintharena'));
    this._halls.push(new Hall('16', 'Porrentruy - Salle d escalade des Tilleuls'));
    this._halls.push(new Hall('17', 'Pratteln - Boulders & Bar'));
    this._halls.push(new Hall('18', 'Root Längenbold - Pilatur Indoor Kletterzentrum Zentralschweiz'));
    this._halls.push(new Hall('19', 'Schaffhausen - Aranea Kletterzentrum'));
    this._halls.push(new Hall('20', 'St. Gallen - Kletterhalle St. Gallen'));
    this._halls.push(new Hall('21', 'Taverne - Evolution Center'));
    this._halls.push(new Hall('22', 'Thun - Klettertreff Thun'));
    this._halls.push(new Hall('23', 'Winterthur - Block Winterthur'));
    this._halls.push(new Hall('24', 'Zäziwil - ZäziBoulder'));
    this._halls.push(new Hall('25', 'Zürich - Kletterzentrum Gaswerk AG'));
  }
}
