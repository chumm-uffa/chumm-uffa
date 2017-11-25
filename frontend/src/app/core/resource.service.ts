import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';



/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */


@Injectable()
export class ResourceService {

  private urlDemo = 'http://localhost:8080/api/alive';

  constructor(
    private http: HttpClient,
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


}
