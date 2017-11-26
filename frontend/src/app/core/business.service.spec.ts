import {TestBed, async, inject} from '@angular/core/testing';
import {BusinessService} from "./business.service";
import {ResourceService} from "./resource.service";
import {Observable} from 'rxjs/Observable';

/**
 * Demo Unit Test für Services mit Testcontainer, Mocking und injector
 */

class ResourceMock {
  checkAlive(): Observable<string> {
    return Observable.create(function(observer) {
      observer.next('i am alive');
    });
  }
}

describe('BusinessService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     providers: [BusinessService, {provide: ResourceService, useClass : ResourceMock }]
    }).compileComponents();
  }));

  it('should get i am alive', inject([BusinessService], (service: BusinessService) => {
    service.checkAlive().subscribe(res =>
      expect(res).toBe('i am alive'));
  }));
});
