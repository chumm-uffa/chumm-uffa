import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Hier sollen alle REST Aufrufe zum Server rein
 */


@Injectable()
export class ResourceService {

  checkAlive(): Observable<any> {
      return Observable.create().of('i am alive');
  }


}
