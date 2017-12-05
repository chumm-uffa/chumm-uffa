import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ResourceService} from './resource.service';
import {Meetup} from './model/meetup';
import {MockService} from './mock.service';
import {AppStateService} from './app-state.service';
import {MeetupRequest} from './model/meetup-request';
import {Hall} from './model/hall';
import {of} from 'rxjs/observable/of';

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

  getHalls(): Observable<Hall[]> {
    const halls: Hall[] = [];
    halls.push(new Hall(1, 'Die Kletterhalle (St. Gallen)'));
    halls.push(new Hall(2, 'Kletterhalle (Winterthur)'));
    return of(halls);
  }

  saveMeetUp(meetup: Meetup): void {
    if ( !meetup.owner ) {
      meetup.owner = this.appState.loggedInUser;
    }
    this.resourceService.saveMeetup(meetup);
  }
}

