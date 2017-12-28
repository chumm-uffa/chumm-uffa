import {Injectable} from '@angular/core';
import {ResourceServiceInterface} from './resource.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {ILoginRequest, IRegisterResponse, ILoginResponse, IRegisterRequest, IUpdateProfileRequest, IUpdateProfileResponse,
  User, Hall, Chat, Meetup, MeetupRequest, RequestStatus, SearchDto, AuthFactory} from '@chumm-uffa/interface';

/**
 * Mock for the resource service
 */
@Injectable()
export class MockService implements ResourceServiceInterface {

  private _users: User[];
  private _meetups: Meetup[];
  private _meetupRequest: MeetupRequest[];
  private _chats: Chat[];

  constructor() {
    this.generateUsers();
    this.generateMeetups();
    this.generateRequest();
    this.generateChats();
  }

  checkAlive(): Observable<string> {
    return of('i am alive');
  }

  newAlive(): Observable<string> {
    return of(' new i am alive');
  }

  register(request: IRegisterRequest): Observable<IRegisterResponse> {
    return of(AuthFactory.createRegisterResponse(true, '', this._users[0], '1'));
  }

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return of(AuthFactory.createLoginResponse(true, '', 'token', this._users[0] ));
  }

  getMeetUps(user: User): Observable<Meetup[]> {
    return of(this._meetups.filter(meetup => meetup.owner.username === user.username));
  }

  getMeetUpRequests(user: User): Observable<MeetupRequest[]> {
    return of(this._meetupRequest);
    // return of(this._meetupRequest.filter(participant => participant.participant.username === user.username));
  }

  loadMeetup(meetupId: string): Observable<Meetup> {
    return of(this._meetups.find(mu => mu.id === meetupId));
  }

  loadRequests(meetupId: string): Observable<MeetupRequest[]> {
    return of(this._meetupRequest);
  }

  /**
   * Es wird nur der Request, nicht aber der User oder das Meetup aktualisiert.
   */
  updateRequest(request: MeetupRequest): Observable<MeetupRequest> {
    return of(new MeetupRequest(request.id, request.participant, request.meetup, request.status));
  }

  loadChatsByMeetupId(meetupId: string): Observable<Chat[]> {
    return of([...this._chats]);
  }

  createChat(chat: Chat): void {
    this._chats.push(chat);
  }

  searchMeetup(searchDto: SearchDto): Observable<Meetup[]> {
    return of(this._meetups);
  }

  requestForParticipation(meetupId: string): Observable<boolean> {
    return of(true);
  }

  deleteMeetup(meetupId: string): Observable<boolean> {
    this._meetups = this._meetups.filter(mu => mu.id !== meetupId);
    return of(true);
  }

  deleteRequest(requestId: string): Observable<boolean> {
    this._meetupRequest = this._meetupRequest.filter(mu => mu.id !== requestId);
    return of(true);
  }

  /**
   * Register a new user
   * @param {User} user
   * @returns {Observable<User>}
   */
  saveUser(request: IUpdateProfileRequest): Observable<IUpdateProfileResponse> {
    return of(AuthFactory.createUpdateProfileResponse(true, "", request.profile));
  }

  get users(): User[] {
    return this._users;
  }

  /**
   * http://www.kletterhallen.net/Kat/schweiz.php
   * @returns {Observable<Hall[]>}
   */
  getHalls(): Observable<Hall[]> {
    const halls: Hall[] = [];
    halls.push(new Hall('1', 'Adelboden - Freizeit- und Sportarena Adelboden'));
    halls.push(new Hall('2', 'Basel - Kletterhalle 7'));
    halls.push(new Hall('3', 'Biel - Crux-Bouldering'));
    halls.push(new Hall('4', 'Chur - Kletterhalle AP n Daun'));
    halls.push(new Hall('5', 'Davos - Kletterwand Davos'));
    halls.push(new Hall('6', 'Interlaken - K44 - Kletterhalle Interlaken'));
    halls.push(new Hall('7', 'küblis - kletterhalle küblis'));
    halls.push(new Hall('8', 'Küblis - Kletterhalle SAC Prättigau'));
    halls.push(new Hall('9', 'Langnau - Climbox'));
    halls.push(new Hall('10', 'Lenzburg - Kraftraktor'));
    halls.push(new Hall('11', 'Luzern - Kletterhalle Eiselin Luzern'));
    halls.push(new Hall('12', 'Meiringen - Kletterhalle Haslital'));
    halls.push(new Hall('13', 'Nidau BE - Sporttreff Ziehl AG'));
    halls.push(new Hall('14', 'Niederwangen - Magnet'));
    halls.push(new Hall('15', 'Näfels - Lintharena'));
    halls.push(new Hall('16', 'Porrentruy - Salle d escalade des Tilleuls'));
    halls.push(new Hall('17', 'Pratteln - Boulders & Bar'));
    halls.push(new Hall('18', 'Root Längenbold - Pilatur Indoor Kletterzentrum Zentralschweiz'));
    halls.push(new Hall('19', 'Schaffhausen - Aranea Kletterzentrum'));
    halls.push(new Hall('20', 'St. Gallen - Kletterhalle St. Gallen'));
    halls.push(new Hall('21', 'Taverne - Evolution Center'));
    halls.push(new Hall('22', 'Thun - Klettertreff Thun'));
    halls.push(new Hall('23', 'Winterthur - Block Winterthur'));
    halls.push(new Hall('24', 'Zäziwil - ZäziBoulder'));
    halls.push(new Hall('25', 'Zürich - Kletterzentrum Gaswerk AG'));
    return of(halls);
  }

  private generateUsers() {
    this._users = [];
    this._users.push(new User('WilliCliffhanger', '', 'm', '', '85'));
    this._users.push(new User('BarbaraChumNidUffa', '', 'f', '', '45'));
    this._users.push(new User('UrsChrumBei', '', 'm', '', '72'));
    this._users.push(new User('PetraImmerBlau', '', 'f', '', '85'));
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
    this._chats.push(new Chat('Arschgeige', this._users[1], new Date(2017, 8, 25, 12, 45)));
    this._chats.push(new Chat('hab dich auch lieb', this._users[2], new Date(2017, 9, 8, 14, 40)));
    this._chats.push(new Chat('wa wotsch', this._users[3], new Date(2017, 6, 15, 16, 5)));
    this._chats.push(new Chat('cha nöd', this._users[0], new Date(2017, 5, 6, 15, 5)));
    this._chats.push(new Chat('kei Bock', this._users[1], new Date(2017, 4, 5, 8, 4)));
    this._chats.push(new Chat('nöd gsicheret', this._users[0], new Date(2017, 2, 5, 10, 5)));
    this._chats.push(new Chat('freie Fall', this._users[3], new Date(2017, 11, 2, 2, 5)));
    this._chats.push(new Chat('we are the champignions', this._users[0], new Date(2017, 10, 2, 12, 42)));
  }
}
