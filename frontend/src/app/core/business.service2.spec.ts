import {BusinessService} from "./business.service";
import {ResourceService} from "./resource.service";


/**
 * Demo Unit Test für Services ohne Hilfsmittel, wir sehen wir müssen dem
 * Serviceconstructor die injects selber mitreichen
 */

describe('BusinessService senza Testbed', () => {

  let service: BusinessService;

  beforeEach(() => service = new BusinessService(new ResourceService()));

  it('should get i am alive', (() => {
    service.checkAlive().subscribe(res =>
      expect(res).toBe('i am alive'));
  }));
});
