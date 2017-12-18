import {async, inject, TestBed} from '@angular/core/testing';
import {BusinessService} from './business.service';
import {ResourceService} from './resource.service';
import {Observable} from 'rxjs/Observable';
import {AppStateService} from './app-state.service';
import {MockService} from './mock.service';

/**
 * Demo Unit Test für Services mit Testcontainer, Mocking und injector
 */

class ResourceMock {
  checkAlive(): Observable<string> {
    return Observable.create(function (observer) {
      observer.next('i am alive');
    });
  }
}

describe('BusinessService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BusinessService,
        AppStateService,
        MockService,
        {provide: ResourceService, useClass: ResourceMock}]
    }).compileComponents();
  }));

  it('should get i am alive', inject([BusinessService], (service: BusinessService) => {
    service.checkAlive().subscribe(res =>
      expect(res).toBe('i am alive'));
  }));
});
