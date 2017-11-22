import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";


/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */


@Injectable()
export class ResourceService {

  /**
   * Demo Inject Service
   * @returns {Observable<string>}
   */
  checkAlive(): Observable<string> {
      return Observable.create(function(observer) {
        observer.next('i am alive');
      });
  }


}
