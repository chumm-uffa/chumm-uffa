import {async, inject, TestBed} from '@angular/core/testing';
import {BusinessService} from './business.service';
import {ResourceService} from './resource.service';
import {Observable} from 'rxjs/Observable';
import {AppStateService} from './app-state.service';
import {MockService} from './mock.service';
import {Hall} from '@chumm-uffa/interface';

/**
 * Demo Unit Test für Services mit Testcontainer, Mocking und injector
 */

class ResourceMock {
  getHalls(): Observable<string> {
    return Observable.create(function (observer) {
      observer.next({halls: [new Hall('1', 'Kletterhalle')]});
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
    service.getHalls().subscribe(res =>
      expect(res[0].name).toBe('Kletterhalle'));
  }));
});
