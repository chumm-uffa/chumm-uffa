import {Injectable} from '@angular/core';
import {Meetup} from './model/meetup';
import {User} from './model/user';
import {MeetupRequest, RequestStatus} from './model/meetup-request';
import {ResourceServiceInterface} from './resource.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Chat} from './model/chat';
import {SearchDto} from './model/searchDto';

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

  getMeetUps(user: User): Observable<Meetup[]> {
    return of(this._meetups.filter(meetup => meetup.owner.username === user.username));
  }

  getMeetUpRequests(user: User): Observable<MeetupRequest[]> {
    return of(this._meetupRequest.filter(participant => participant.participant.username === user.username));
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
    return of(new MeetupRequest(request.participant, request.meetup, request.status));
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

  get users(): User[] {
    return this._users;
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
    this._meetupRequest.push(new MeetupRequest(this._users[1], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest(this._users[2], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest(this._users[3], this._meetups[1]));
    this._meetupRequest.push(new MeetupRequest(this._users[0], this._meetups[2], RequestStatus.ACCEPT));
    this._meetupRequest.push(new MeetupRequest(this._users[1], this._meetups[2]));
    this._meetupRequest.push(new MeetupRequest(this._users[0], this._meetups[3], RequestStatus.DECLINED));
    this._meetupRequest.push(new MeetupRequest(this._users[3], this._meetups[3]));
    this._meetupRequest.push(new MeetupRequest(this._users[0], this._meetups[4]));
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
