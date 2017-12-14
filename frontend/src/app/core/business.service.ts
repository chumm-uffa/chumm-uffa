import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ResourceService} from './resource.service';
import {Meetup} from './model/meetup';
import {MockService} from './mock.service';
import {AppStateService} from './app-state.service';
import {MeetupRequest} from './model/meetup-request';
import {Hall} from './model/hall';
import {of} from 'rxjs/observable/of';
import {User} from './model/user';
import {Chat} from './model/chat';
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

  checkAlive(): Observable<string> {
    return this.mockService.checkAlive();
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

  saveMeetUp(meetup: Meetup): void {
    if (!meetup.owner) {
      meetup.owner = this.appState.loggedInUser;
    }
    this.resourceService.saveMeetup(meetup);
  }

  loadMeetup(meetupId: string): Observable<Meetup> {
    return this.mockService.loadMeetup(meetupId);
  }

  saveUser(user: User): void {
    // todo ruf mir den Server
    console.log('saveUser called');
    this.appState.loggedInUser = user;
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
    const newOne =  new Chat(message, this.appState.loggedInUser, new Date());
    this.mockService.createChat(newOne);
    return newOne;
  }

  searchMeetUp(searchDto: SearchDto): Observable<Meetup[]> {
    return this.mockService.searchMeetup(searchDto);
  }
}

