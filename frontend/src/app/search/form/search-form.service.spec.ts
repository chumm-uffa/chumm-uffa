import {async, inject, TestBed} from '@angular/core/testing';
import {SearchFormService} from './search-form.service';
import {FormBuilder} from '@angular/forms';

const optDate = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

describe('Meetup Form', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SearchFormService, FormBuilder]
    }).compileComponents();
  }));

  it('should create Meeup', inject([SearchFormService], (searchFb: SearchFormService) => {
    // const meetup = meetupFb.checkMeetup();
    // expect(meetup).toBeDefined();
  }));
});

