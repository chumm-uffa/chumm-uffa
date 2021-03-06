import {async, inject, TestBed} from '@angular/core/testing';
import {BusinessService} from '../business.service';
import {ResourceService} from '../resource.service';
import {Observable} from 'rxjs/Observable';
import {AppStateService} from '../app-state.service';
import {MockService} from '../mock.service';
import {Hall} from '@chumm-uffa/interface';
import {AppDialogService} from '../app-dialog.service';
import {NotificationService} from '../notification.service';

/**
 * Demo Unit Test für Services mit Testcontainer, Mocking und injector
 */

class ResourceMock {
  getHalls(): Observable<string> {
    return Observable.create(function (observer) {
      observer.next({halls: [new Hall('1', 'Kletterhalle')]});
      observer.complete();
    });
  }
}

class AppDialogServiceMock {
}

describe('BusinessService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BusinessService,
        AppStateService,
        NotificationService,
        {provide: ResourceService, useClass: ResourceMock},
        {provide: AppDialogService, useClass: AppDialogServiceMock}]
    }).compileComponents();
  }));

  it('should get min 1 hall', inject([BusinessService], (service: BusinessService) => {
    service.getHalls().subscribe(res =>
      expect(res[0].name).toBe('Kletterhalle'));
  }));
});
