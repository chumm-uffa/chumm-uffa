import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ResourceService} from "./resource.service";

/**
 * Hier kann Businesslogik rein
 */

@Injectable()
export class BusinessService {

  constructor(private resourceService: ResourceService){}

  checkAlive(): Observable<string> {
    return this.resourceService.checkAlive();
  }
}
