import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('App', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent]
    });
  });

  it('should have equal length of language files', () => {
    const de = require('../assets/i18n/de.json');
    const fr = require('../assets/i18n/fr.json');

    expect(de.length).toEqual(fr.length);
  });

  it('should have each key in each language file', () => {
    const de = require('../assets/i18n/de.json');
    const fr = require('../assets/i18n/fr.json');

    const languages = [de, fr];

    for (const langOuter of languages) {
      for (const langInner of languages) {
        for (const key in langOuter) {
          if (langInner.hasOwnProperty(key)) {
            expect(true).toBeTruthy();
          } else {
            expect(false).toBeTruthy();
          }
        }
      }
    }
  });

});
