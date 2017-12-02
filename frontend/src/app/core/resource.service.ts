import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Meetup} from './model/meetup';
import {MeetupRequest} from './model/meetup-request';
import {User} from './model/user';


/**
 * Resource service interface
 */
export interface ResourceServiceInterface {
  checkAlive(): Observable<string>;
  newAlive(): Observable<string>;
  getMeetUps(user: User): Observable<Meetup[]>;
  getMeetUpRequests(user: User): Observable<MeetupRequest[]>;
}

/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */
@Injectable()
export class ResourceService implements ResourceServiceInterface{

  private urlDemo = 'http://localhost:8080/api/alive';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Demo Inject Service
   * @returns {Observable<string>}
   */
  checkAlive(): Observable<string> {
      return Observable.create(function(observer) {
        observer.next('i am alive');
      });
  }

  /**
   * Demo REST Aufruf
   * @returns {Observable<string>}
   */
  newAlive(): Observable<string> {
    return this.http.post<string>(this.urlDemo, {text: 'Is Server Alive?'});
  }

  /**
   * Demo REST Aufruf
   * @returns {Observable<Meetup[]>}
   */
  getMeetUps(user: User): Observable<Meetup[]> {
    return null;
  }

  /**
   * Demo REST Aufruf
   * @returns {Observable<MeetupRequest[]>}
   */
  getMeetUpRequests(user: User): Observable<MeetupRequest[]> {
    return null;
  }
}
