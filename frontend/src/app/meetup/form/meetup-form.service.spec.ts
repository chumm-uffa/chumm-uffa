import {async, inject, TestBed} from '@angular/core/testing';
import {MeetupFormService} from './meetup-form.service';
import {FormBuilder} from '@angular/forms';
import {Meetup} from '@chumm-uffa/interface';

const optDate = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};

describe('Meetup Form', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [MeetupFormService, FormBuilder]
    }).compileComponents();
  }));

  it('should create Meeup', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const meetup = meetupFb.checkMeetup();
    expect(meetup).toBeDefined();
  }));

  it('should not change', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    let meetup = meetupFb.checkMeetup();
    meetup = meetupFb.checkMeetup(meetup);

    expect(meetup).toBe(meetup);
  }));

  it('should should validate indoor filled', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const form = meetupFb.createForm(meetupFb.checkMeetup());
    expect(form.errors.required.valid).toBeFalsy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should should validate outdoor filled', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const mu = meetupFb.checkMeetup();
    mu.outdoor = 'outdoor';
    const form = meetupFb.createForm(mu);
    form.controls.outdoor.patchValue('');
    expect(form.errors.required.valid).toBeFalsy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should validate empty date', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const form = meetupFb.createForm(createValidMeetup(meetupFb));
    form.controls.date.patchValue('');
    expect(form.controls.date.errors.required).toBeTruthy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should validate empty from', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const form = meetupFb.createForm(createValidMeetup(meetupFb));
    form.controls.fromTime.patchValue('');
    expect(form.controls.fromTime.errors.required).toBeTruthy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should validate empty to', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const form = meetupFb.createForm(createValidMeetup(meetupFb));
    form.controls.toTime.patchValue('');
    expect(form.controls.toTime.errors.required).toBeTruthy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should validate from in the past', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const form = meetupFb.createForm(createValidMeetup(meetupFb));
    form.controls.fromTime.patchValue('00:00');
    expect(form.errors.combinedMomentNotBefore.valid).toBeFalsy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should validate from before to', inject([MeetupFormService], (meetupFb: MeetupFormService) => {
    const form = meetupFb.createForm(createValidMeetup(meetupFb));
    form.controls.fromTime.patchValue('23:59');
    form.controls.toTime.patchValue('23:58');
    expect(form.errors.timeAfterBefore.valid).toBeFalsy();
    expect(form.invalid).toBeTruthy();
  }));

  it('should merge meetup', inject([MeetupFormService], (meetupFb: MeetupFormService) => {

    const meetup: Meetup = createValidMeetup(meetupFb);
    const form = meetupFb.createForm(meetup);

    form.controls.fromTime.patchValue('10:00');
    form.controls.toTime.patchValue('11:15');
    form.controls.date.patchValue('2017-12-06');
    form.controls.indoor.patchValue('01');
    form.controls.outdoor.patchValue('Rappi');
    form.controls.locationType.patchValue('in');
    form.controls.activity.patchValue('bouldern');

    meetupFb.mergeMeetUp(form.value, meetup);

    expect(meetup.from.toLocaleDateString('de-DE', optDate)).toBe('6.12.2017, 10:00');
    expect(meetup.to.toLocaleDateString('de-DE', optDate)).toBe('6.12.2017, 11:15');
    expect(meetup.indoor).toBe('01');
    expect(meetup.outdoor).toBe(null);
    expect(meetup.activity).toBe('bouldern');
  }));


  function createValidMeetup(meetupFb: MeetupFormService): Meetup {
    const mu = meetupFb.checkMeetup();
    mu.indoor = '01';
    return mu;
  }


});

